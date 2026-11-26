"use server";

import { db } from "@/db";
import { admissionRegistrations } from "@/db/schema";
import { ADMISSION_CLASSES } from "@/lib/admissions";

export async function submitAdmissionEnquiry(
  _previous: { error?: string; reference?: string },
  form: FormData,
): Promise<{ error?: string; reference?: string }> {
  const field = (name: string) => {
    const value = form.get(name);
    return typeof value === "string" ? value.trim() : "";
  };

  const id = field("requestId");
  const studentName = field("studentName");
  const classSought = field("classSought");
  const guardianName = field("guardianName");
  const guardianPhone = field("guardianPhone");
  const guardianEmail = field("guardianEmail");
  const message = field("message");

  if (field("website") || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(id)) {
    return { error: "Please reload the page and try again." };
  }
  if (studentName.length < 2 || studentName.length > 120 || guardianName.length < 2 || guardianName.length > 120
      || !ADMISSION_CLASSES.includes(classSought) || form.get("consent") !== "on") {
    return { error: "Enter both names, select a class, and confirm that the school can contact you." };
  }
  const phoneDigits = guardianPhone.replace(/\D/g, "");
  if (!/^\+?[\d ().-]{7,24}$/.test(guardianPhone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    return { error: "Enter a valid phone number for the parent or guardian." };
  }
  if (guardianEmail && (guardianEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guardianEmail))) {
    return { error: "Enter a valid email address or leave it blank." };
  }
  if (message.length > 1000) return { error: "Keep your message within 1,000 characters." };

  try {
    await db.insert(admissionRegistrations).values({
      id, studentName, classSought, guardianName, guardianPhone,
      guardianEmail: guardianEmail || null, message: message || null, consent: true,
    }).onConflictDoNothing({ target: admissionRegistrations.id }).run();
    return { reference: id };
  } catch {
    return { error: "We couldn’t save your enquiry. Try again or call the school office." };
  }
}
