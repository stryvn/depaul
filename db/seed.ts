import { db } from "./index";
import { stories, documents } from "./schema";

const initialDocuments = [
  {
    title: "CBSE Mandatory Public Disclosure (Appendix-IX)",
    slug: "cbse-mandatory-public-disclosure",
    category: "Statutory",
    description:
      "Complete statutory compliance dossier including affiliation status, building safety certificates, fire NOC, water testing certificates, PTA list, and staff strength breakdown.",
    fileUrl: "/assets/documents/mandatory-disclosure-CBSE-1.pdf",
    fileType: "PDF",
    fileSize: "578 KB",
    isFeatured: true,
    date: "November 2026",
    downloadsCount: 1420,
    displayOrder: 1,
  },
  {
    title: "Academic Calendar & Examination Schedule 2026-27",
    slug: "academic-calendar-examination-schedule-2026-27",
    category: "Academics",
    description:
      "Comprehensive term milestones, unit tests, mid-term & final board schedule with school holidays and cultural observances.",
    fileUrl: "/assets/documents/C-O2-ANNUAL-ACADEMIC-CALENDER-2026-27.pdf",
    fileType: "PDF",
    fileSize: "1.6 MB",
    isFeatured: false,
    date: "October 2026",
    downloadsCount: 890,
    displayOrder: 2,
  },
  {
    title: "CBSE Affiliation Extension Letter 2026–2031",
    slug: "cbse-affiliation-extension-letter-2026-2031",
    category: "Statutory",
    description:
      "Official Central Board of Secondary Education (CBSE) Senior Secondary affiliation grant letter extending status up to March 31, 2031 (Affiliation No: 930624).",
    fileUrl: "/assets/documents/FINAL-AFFILIATION-LETTER-26.pdf",
    fileType: "PDF",
    fileSize: "1.1 MB",
    isFeatured: false,
    date: "October 2026",
    downloadsCount: 740,
    displayOrder: 3,
  },
  {
    title: "Fee Structure & Payment Schedule 2026-27",
    slug: "fee-structure-payment-schedule-2026-27",
    category: "Finance",
    description:
      "Comprehensive tuition fee breakdown per term, bus transportation rates, and official online payment modes approved by the school management.",
    fileUrl: "/assets/documents/C-01-FEE-STRUCTURE-2024-25.pdf",
    fileType: "PDF",
    fileSize: "192 KB",
    isFeatured: false,
    date: "August 2026",
    downloadsCount: 1100,
    displayOrder: 4,
  },
  {
    title: "Fire & Rescue Services Safety Certificate & NOC",
    slug: "fire-safety-certificate-noc",
    category: "Statutory",
    description:
      "Official Fire Safety NOC issued by the Department of Fire and Rescue Services, Government of Kerala, certifying campus compliance.",
    fileUrl: "/assets/documents/B-06-FIRE-SAFETY-CERTIFICATE.pdf",
    fileType: "PDF",
    fileSize: "220 KB",
    isFeatured: false,
    date: "September 2026",
    downloadsCount: 520,
    displayOrder: 5,
  },
  {
    title: "National Building Safety & Structural Stability Certificate",
    slug: "building-safety-structural-certificate",
    category: "Statutory",
    description:
      "Certified structural safety and fitness report of the school building issued by the competent Assistant Executive Engineer, PWD.",
    fileUrl: "/assets/documents/B-05-BUILDING-SAFETY-CERTIFICATEBUILDING.pdf",
    fileType: "PDF",
    fileSize: "456 KB",
    isFeatured: false,
    date: "August 2026",
    downloadsCount: 460,
    displayOrder: 6,
  },
  {
    title: "Safe Drinking Water & Sanitary Condition Certificate",
    slug: "water-health-sanitation-certificate",
    category: "Statutory",
    description:
      "Public health and potable drinking water laboratory testing report along with institutional sanitary fitness clearance.",
    fileUrl: "/assets/documents/B-08-WATER-HEALTH-AND-SANITATION-CERTIFICATES.pdf",
    fileType: "PDF",
    fileSize: "508 KB",
    isFeatured: false,
    date: "September 2026",
    downloadsCount: 410,
    displayOrder: 7,
  },
  {
    title: "Government of Kerala No Objection Certificate (NOC)",
    slug: "state-govt-no-objection-certificate-noc",
    category: "Statutory",
    description:
      "Formal NOC issued by the General Education Department, Government of Kerala, for affiliation with the Central Board of Secondary Education.",
    fileUrl: "/assets/documents/B-03-COPY-OF-NO-OBJECTION-CERTIFICATE-NOC.pdf",
    fileType: "PDF",
    fileSize: "150 KB",
    isFeatured: false,
    date: "July 2026",
    downloadsCount: 380,
    displayOrder: 8,
  },
  {
    title: "RTE Act Recognition Certificate",
    slug: "rte-act-recognition-certificate",
    category: "Statutory",
    description:
      "Certificate of recognition under the Right of Children to Free and Compulsory Education Act (RTE), 2009 issued by the District Educational Officer.",
    fileUrl: "/assets/documents/B-04-COPY-OF-RECOGNITION-CERTIFICATE.pdf",
    fileType: "PDF",
    fileSize: "388 KB",
    isFeatured: false,
    date: "July 2026",
    downloadsCount: 340,
    displayOrder: 9,
  },
  {
    title: "Vincentian Trust Registration & Renewal Certificate",
    slug: "society-trust-registration-certificate",
    category: "Statutory",
    description:
      "Certified legal registration charter and renewal deed of the Marymatha Province of Vincentian Society administering the institution.",
    fileUrl: "/assets/documents/B-02-COPIES-OF-SOCIETYTRUSTCOMPANY-REGISTRATIONRENEWAL-CERTIFICATE.pdf",
    fileType: "PDF",
    fileSize: "2.9 MB",
    isFeatured: false,
    date: "June 2026",
    downloadsCount: 290,
    displayOrder: 10,
  },
  {
    title: "Self-Certification Proforma for CBSE Affiliation Extension",
    slug: "cbse-self-certification-proforma",
    category: "Statutory",
    description:
      "Official self-certification affidavit and compliance proforma submitted by the Manager and Principal to CBSE.",
    fileUrl: "/assets/documents/B-07-COPY-OF-THE-SELF-CERTIFICATION-FOR-AFFILIATIONUPGRADATIONEXTENSION-OF-AFFILIATION.pdf",
    fileType: "PDF",
    fileSize: "608 KB",
    isFeatured: false,
    date: "September 2026",
    downloadsCount: 310,
    displayOrder: 11,
  },
  {
    title: "School Management Committee (SMC) Constitution",
    slug: "school-management-committee-constitution",
    category: "Committees",
    description:
      "Official list of members of the School Management Committee with designations, occupations, and parent/teacher representatives.",
    fileUrl: "/assets/documents/C-03-SCHOOL-MANAGEMENT-COMMITTEE.pdf",
    fileType: "PDF",
    fileSize: "199 KB",
    isFeatured: false,
    date: "October 2026",
    downloadsCount: 420,
    displayOrder: 12,
  },
  {
    title: "Parent-Teacher Association (PTA) Executive Body 2026-27",
    slug: "pta-executive-committee-2026-27",
    category: "Committees",
    description:
      "Elected Parent-Teacher Association executive committee roster, contact representatives, and general body resolutions for 2026-27.",
    fileUrl: "/assets/documents/PTA-EXECUTIVE-2026-2027.pdf",
    fileType: "PDF",
    fileSize: "267 KB",
    isFeatured: false,
    date: "October 2026",
    downloadsCount: 560,
    displayOrder: 13,
  },
  {
    title: "Teaching Staff Registry & Academic Qualifications",
    slug: "teaching-staff-registry-qualifications",
    category: "Academics",
    description:
      "Complete roster of 49 faculty members including PGT, TGT, PRT, NTT, physical educators, and wellness counsellors with educational credentials.",
    fileUrl: "/assets/documents/TEACHERS-LIST-.pdf",
    fileType: "PDF",
    fileSize: "112 KB",
    isFeatured: false,
    date: "November 2026",
    downloadsCount: 680,
    displayOrder: 14,
  },
  {
    title: "CBSE Board Examination Results (Class X & XII)",
    slug: "cbse-board-examination-results-three-years",
    category: "Academics",
    description:
      "Certified 3-year performance record of Class X and Class XII board examination batches demonstrating continuous 100% pass achievements.",
    fileUrl: "/assets/documents/C-05-LAST-THREE-YEARS-BOARD-EXAM-RESULT.pdf",
    fileType: "PDF",
    fileSize: "177 KB",
    isFeatured: false,
    date: "July 2026",
    downloadsCount: 620,
    displayOrder: 15,
  },
  {
    title: "Transfer Certificate (TC) Application Guidelines & Clearance Format",
    slug: "transfer-certificate-tc-guidelines",
    category: "Admissions",
    description:
      "Official withdrawal procedure, dues clearance certificate checklist, and sample TC specimen format with online tracking instructions.",
    fileUrl: "/assets/documents/mandatory-disclosure-CBSE-1.pdf",
    fileType: "PDF",
    fileSize: "640 KB",
    isFeatured: false,
    date: "October 2026",
    downloadsCount: 540,
    displayOrder: 16,
  },
];

const initialStories = [
  {
    title: "Annual Sports Meet 'Athlos' Celebrates Athletic Brilliance",
    slug: "annual-sports-meet-athlos-celebrates-athletic-brilliance",
    excerpt:
      "A thrilling display of sportsmanship, track events, and house championships conducted with distinguished regional sports dignitaries on campus.",
    body: `## Athlos 2026 Highlights\n\nA thrilling display of sportsmanship, track events, and house championships conducted with distinguished regional sports dignitaries on campus.\n\nStudents from all four houses showcased exemplary dedication, camaraderie, and athletic brilliance throughout the multi-day tournament.\n\n### Key Events\n- 100m, 200m, and 400m Track Finals\n- 4x100m Relay Championships\n- Shot Put and High Jump Arena Competitions\n\nCongratulations to all participants and champions for setting new campus benchmarks!`,
    category: "Sports & Athletics",
    coverImage: "/assets/events/sportsday01.jpeg",
    publishedAt: "2026-11-15",
  },
  {
    title: "Nexora Fest — Inter-School Tech & Cultural Summit",
    slug: "nexora-fest-inter-school-tech-cultural-summit",
    excerpt: "Students engineered autonomous prototypes and showcased artistic brilliance.",
    body: `## Nexora 2026\n\nStudents engineered autonomous prototypes and showcased artistic brilliance across competitive coding, robotics, and creative arts exhibitions.\n\nOver 20 schools participated in this annual celebration of innovation, logic, and creative expression.`,
    category: "Academics & Tech",
    coverImage: "/assets/events/Nexora2k26.jpeg",
    publishedAt: "2026-11-10",
  },
  {
    title: "Children's Day Commemoration & Cultural Assemblies",
    slug: "childrens-day-commemoration-cultural-assemblies",
    excerpt: "Vibrant performances and games honoring the spirit of our young learners.",
    body: `## Celebrating Our Students\n\nVibrant performances and games honoring the spirit of our young learners on campus.\n\nTeachers led special cultural programs, music ensembles, and games designed to spark joy across all grade levels.`,
    category: "Campus Life",
    coverImage: "/assets/events/childrensday.jpeg",
    publishedAt: "2026-11-14",
  },
  {
    title: "Environment Day Greenery & Plantation Drive",
    slug: "environment-day-greenery-plantation-drive",
    excerpt: "Planting native trees across the campus grounds to champion ecological harmony.",
    body: `## Greening Our Western Ghats Foothills\n\nPlanting native trees across the campus grounds to champion ecological harmony and sustainable environmental stewardship.\n\nOur eco-club members committed to nurturing over 200 native saplings planted around the school perimeters.`,
    category: "Social Outreach",
    coverImage: "/assets/events/environmentday.jpg",
    publishedAt: "2026-11-05",
  },
  {
    title: "Inter-House Track & Field Championships",
    slug: "inter-house-track-field-championships",
    excerpt: "Athletes competing across track relays, sprints, and field events with spirited house pride.",
    body: `## House Pride and Athletic Prowess\n\nAthletes competing across track relays, sprints, and field events with spirited house pride and exceptional sportsmanship.\n\nThe annual championship brought together students, coaches, and alumni in a spirited atmosphere.`,
    category: "Sports",
    coverImage: "/assets/events/sportsday02.jpeg",
    publishedAt: "2026-10-28",
  },
  {
    title: "Advanced Laboratories & Experiential STEM Curriculum",
    slug: "advanced-laboratories-experiential-stem-curriculum",
    excerpt: "Hands-on scientific inquiry and laboratory discovery guiding higher secondary scholars.",
    body: `## Modern STEM Learning Environments\n\nHands-on scientific inquiry and laboratory discovery guiding higher secondary scholars through modern biology, chemistry, and physics labs.\n\nWith upgraded apparatus and safety standards, De Paul fosters genuine scientific curiosity.`,
    category: "Academics",
    coverImage: "/assets/attachments/biologylab.jpg",
    publishedAt: "2026-10-15",
  },
];

async function seed() {
  console.log("Seeding initial stories...");
  for (const story of initialStories) {
    try {
      await db.insert(stories).values(story).onConflictDoNothing();
      console.log(`Seeded story: ${story.title}`);
    } catch (err) {
      console.error(`Error inserting story ${story.title}:`, err);
    }
  }

  console.log("Seeding initial documents & disclosures...");
  for (const doc of initialDocuments) {
    try {
      await db.insert(documents).values(doc).onConflictDoNothing();
      console.log(`Seeded document: ${doc.title}`);
    } catch (err) {
      console.error(`Error inserting document ${doc.title}:`, err);
    }
  }

  console.log("All seeding complete!");
}

seed();
