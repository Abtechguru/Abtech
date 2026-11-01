/** Curated case studies: no fictional analytics, launch status, or testimonials. */
export type WorkCategory = "All" | "Systems" | "AI & impact" | "Commerce" | "Analytics";
export type CaseStudy = {
  title: string;
  slug: string;
  index: string;
  type: Exclude<WorkCategory, "All">;
  eyebrow: string;
  summary: string;
  details: string;
  stack: string[];
  highlights: string[];
  href?: string;
  appearance: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    title: "CareMandate AI",
    slug: "caremandate-ai",
    type: "Systems",
    eyebrow: "Healthcare operations / SaaS",
    summary: "Complex care operations, designed as one coherent system.",
    details: "A multi-role healthcare operations platform covering agency management, referral intake, care episodes, staffing, compliance workflows and operational oversight. Built around tenant-aware access boundaries and traceable actions.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    highlights: ["Multi-role workspaces", "Referral & intake pipeline", "Tenant-aware authorization"],
    href: "https://github.com/Abtechguru/caremandate_hsc",
    appearance: "care"
  },
  {
    index: "02",
    title: "Future Syntax",
    slug: "future-syntax",
    type: "AI & impact",
    eyebrow: "Education / Social impact",
    summary: "A future worth building starts with someone believing in you.",
    details: "A community-led mentorship initiative for boys aged 10–15 who lack consistent parental guidance. Combines digital literacy, introductory coding and life skills in a safe, supportive learning environment.",
    stack: ["Digital literacy", "Coding", "Mentorship"],
    highlights: ["Community-centred delivery", "Foundational technology skills", "Life-skills mentoring"],
    href: "https://github.com/Abtechguru/FutureSkillsSyntax",
    appearance: "syntax"
  },
  {
    index: "03",
    title: "TaireLuxury",
    slug: "taireluxury",
    type: "Commerce",
    eyebrow: "Commerce / Client product",
    summary: "A more considered way to discover, shop and connect.",
    details: "An e-commerce rebuild focused on an elegant shopping journey: collection discovery, product information, shopping bag, checkout planning, customer accounts and an operational administration experience.",
    stack: ["Commerce", "React ecosystem", "Product UX"],
    highlights: ["Collection-driven discovery", "Customer journeys", "Inventory & order workflows"],
    appearance: "taire"
  },
  {
    index: "04",
    title: "SmartMove Nigeria",
    slug: "smartmove-nigeria",
    type: "Analytics",
    eyebrow: "Mobility / Data storytelling",
    summary: "Turning public transport data into better decisions.",
    details: "A Lagos transportation analytics hackathon project studying trip reliability, arrival delays, cancellations, fleet availability and maintenance patterns through an executive-facing dashboard.",
    stack: ["Power BI", "Data analysis", "Next.js"],
    highlights: ["Operational performance metrics", "Route-level insights", "Decision-focused storytelling"],
    appearance: "move"
  }
];
