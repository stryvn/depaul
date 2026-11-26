"use client";

import { startTransition, useActionState, useRef } from "react";
import { submitAdmissionEnquiry } from "@/app/actions/admissions";
import { ADMISSION_CLASSES } from "@/lib/admissions";

const control = "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900";

export function AdmissionEnquiryForm() {
  const requestId = useRef<string | null>(null);
  const [state, action, pending] = useActionState(async (previous: { error?: string; reference?: string }, data: FormData) => {
    requestId.current ??= crypto.randomUUID();
    data.set("requestId", requestId.current);
    return submitAdmissionEnquiry(previous, data);
  }, {});

  if (state.reference) {
    return <p role="status" className="rounded-lg bg-emerald-50 p-4 text-emerald-900">
      Your enquiry was received. The school office will follow up using the contact details you provided. Reference <strong className="break-all">{state.reference}</strong>.
    </p>;
  }

  return (
    <form method="post" className="space-y-4" onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      startTransition(() => action(data));
    }}>
      <fieldset disabled={pending} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Student name
          <input name="studentName" required minLength={2} maxLength={120} className={control} />
        </label>
        <label className="text-sm font-semibold">Class sought
          <select name="classSought" required defaultValue="" className={control}>
            <option value="" disabled>Select a class</option>
            {ADMISSION_CLASSES.map((grade) => <option key={grade}>{grade}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Parent or guardian name
          <input name="guardianName" required minLength={2} maxLength={120} className={control} />
        </label>
        <label className="text-sm font-semibold">Parent or guardian phone
          <input name="guardianPhone" type="tel" autoComplete="tel" required minLength={7} maxLength={25} className={control} />
        </label>
        <label className="text-sm font-semibold sm:col-span-2">Parent or guardian email (optional)
          <input name="guardianEmail" type="email" autoComplete="email" maxLength={254} className={control} />
        </label>
        <label className="text-sm font-semibold sm:col-span-2">Message (optional)
          <textarea name="message" rows={3} maxLength={1000} className={control} />
        </label>
        <div hidden><label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="flex items-start gap-2 text-sm sm:col-span-2">
          <input name="consent" type="checkbox" required className="mt-1" />
          <span>I am the student’s parent or guardian. The school may use these details to respond to this enquiry.</span>
        </label>
      </fieldset>
      {state.error && <p role="alert" className="text-sm font-semibold text-red-700">{state.error}</p>}
      <button disabled={pending} className="ed-section-cta disabled:opacity-60">{pending ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}
