import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Github, Layers3, ShieldCheck } from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "./caseStudies";
import "../../../styles/iconic-portfolio.css";

type StoryContent = {
  state: string;
  problem: string;
  approach: string;
  systems: { step: string; name: string; description: string }[];
  principles: string[];
  closing: string;
};

const STORIES: Record<string, StoryContent> = {
  "caremandate-ai": {
    state: "Active product development",
    problem: "Care agencies coordinate referrals, client onboarding, staffing, reviews and compliance across workflows that are often disconnected. Fragmentation makes it harder to keep information consistent, roles clear and decisions auditable.",
    approach: "Design an agency-centred operating system that gives each participant a focused workspace while connecting processes through a single, permission-aware data model. The roadmap prioritizes explicit authorization, real data and reliable workflow transitions over surface-level dashboards.",
    systems: [
      { step: "01", name: "Agency & identity", description: "Tenant-aware users, roles and operating boundaries" },
      { step: "02", name: "Referral & assessment", description: "A traceable intake workflow, from referral to admission" },
      { step: "03", name: "Care operations", description: "Client episodes, staff, credentials and operational coordination" },
      { step: "04", name: "Audit & oversight", description: "Recorded actions, compliance context and reporting" }
    ],
    principles: ["Authorized data access by agency and role", "Auditable state transitions", "Clear ownership of clinical and non-clinical decisions", "No synthetic operational records presented as real"],
    closing: "This is an evolving software product, not a claim of clinical certification or production authorization."
  },
  "future-syntax": {
    state: "Community initiative in development",
    problem: "Some boys grow up without consistent parental guidance or accessible mentors. They can miss opportunities to explore technology, develop confidence and build practical foundations for the future.",
    approach: "Combine community-based, small-group mentorship with accessible coding, digital literacy and essential life skills. The initiative is designed around consistency, safety, encouragement and age-appropriate learning for boys aged 10–15.",
    systems: [
      { step: "01", name: "Build trust", description: "A supportive group environment with consistent guidance" },
      { step: "02", name: "Discover technology", description: "Digital literacy, basic programming and simple projects" },
      { step: "03", name: "Develop character", description: "Responsibility, financial awareness and growth mindset" },
      { step: "04", name: "Keep learning", description: "Practical activities and opportunities for continued mentorship" }
    ],
    principles: ["Age-appropriate and inclusive learning activities", "Youth safeguarding and responsible mentorship", "Practical skill-building over passive instruction", "Honest reporting of activities and outcomes"],
    closing: "Program design and delivery are being developed; participant numbers or outcomes are not implied."
  },
  "taireluxury": {
    state: "Client build in progress",
    problem: "A premium hair and beauty brand needs more than a brochure. Customers should be able to browse its collections confidently, understand each product, follow a consistent purchase journey and keep track of their requests.",
    approach: "Reimagine the brand as an image-led commerce experience, with a seamless path from discovery to product detail, shopping bag, checkout and customer account. Couple the storefront with practical product, inventory and order management workflows.",
    systems: [
      { step: "01", name: "Brand & collections", description: "Editorial storefront and coherent catalogue structure" },
      { step: "02", name: "Shopping journey", description: "Product detail, bag, checkout and confirmation" },
      { step: "03", name: "Customer experience", description: "Accounts, order visibility and communication" },
      { step: "04", name: "Commerce operations", description: "Administration for catalogue, inventory and order fulfilment" }
    ],
    principles: ["Product imagery drives the visual hierarchy", "Accessible navigation and mobile shopping", "Authenticated customer data belongs to real accounts", "Payments and fulfilment require end-to-end verification"],
    closing: "This case study describes the agreed build direction and work in progress; it does not represent all commerce integrations as live."
  },
  "smartmove-nigeria": {
    state: "Hackathon analytics prototype",
    problem: "Transport operations generate large amounts of data, but raw records alone do not explain where service reliability, arrival times, cancellations or fleet maintenance need attention.",
    approach: "Organize multiple transit datasets into decision-ready operational signals. Design the dashboard around a small set of interpretable indicators, then connect the numbers to route-level patterns and actionable questions.",
    systems: [
      { step: "01", name: "Gather signals", description: "Trips, routes, tickets, fleet and maintenance records" },
      { step: "02", name: "Model performance", description: "Consistent reliability, delay and availability indicators" },
      { step: "03", name: "Reveal patterns", description: "Accessible charts and route comparisons" },
      { step: "04", name: "Tell the story", description: "Operational recommendations for decision-makers" }
    ],
    principles: ["Define the metric before drawing the chart", "Explain the operational context behind outliers", "Keep comparisons understandable", "Separate findings from proposed improvement targets"],
    closing: "The original work was developed as a hackathon project, not as a deployed transit operations platform."
  }
};

function MissingCaseStudy() {
  return (
    <div className="ip-root ip-study-page">
      <Helmet><title>Case study not found — ABTECH</title><meta name="robots" content="noindex" /></Helmet>
      <div className="ip-container ip-study-missing">
        <span className="ip-eyebrow">404 / WORK</span>
        <h1>Not found<span className="ip-accent">.</span></h1>
        <p>That case study isn't available. Browse the selected projects instead.</p>
        <a className="ip-button-primary" href="/#work"><ArrowLeft size={18} /> Back to work</a>
      </div>
    </div>
  );
}

export function CaseStudyPage() {
  const slug = typeof window === "undefined" ? "" : window.location.pathname.split("/").filter(Boolean)[1] || "";
  const project = CASE_STUDIES.find(item => item.slug === slug);
  const story = STORIES[slug];
  if (!project || !story) return <MissingCaseStudy />;

  const index = CASE_STUDIES.indexOf(project);
  const next: CaseStudy = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  return (
    <div className="ip-root ip-study-page">
      <Helmet>
        <title>{project.title} — Case Study | Lateef Abiodun</title>
        <meta name="description" content={project.title + ": " + project.details} />
        <meta property="og:title" content={project.title + " — Engineering Case Study"} />
        <meta property="og:description" content={project.summary} />
        <meta property="og:type" content="article" />
      </Helmet>
      <a className="ip-skip" href="#study-content">Skip to case study</a>
      <header className="ip-study-header">
        <div className="ip-container ip-study-header-inner">
          <a className="ip-brand" href="/#top" aria-label="ABTECH portfolio home"><span className="ip-brand-mark" aria-hidden="true">a<span>.</span></span><span className="ip-brand-word">ABTECH<span className="ip-brand-suffix"> / DEV</span></span></a>
          <a className="ip-study-back" href="/#work"><ArrowLeft size={17} /> All projects</a>
        </div>
      </header>

      <main id="study-content">
        <section className="ip-study-hero">
          <div className="ip-container">
            <div className="ip-study-breadcrumb"><a href="/">HOME</a><span>/</span><a href="/#work">WORK</a><span>/</span><strong>{project.index}</strong></div>
            <div className="ip-study-title-grid">
              <div>
                <span className="ip-eyebrow">{project.eyebrow} / CASE STUDY {project.index}</span>
                <h1>{project.title}<span className="ip-accent">.</span></h1>
                <p>{project.summary}</p>
              </div>
              <div className="ip-study-status"><span>PROJECT STATUS</span><strong><span className="ip-pulse-dot" />{story.state}</strong></div>
            </div>
            <div className={"ip-study-visual ip-work-" + project.appearance}>
              <div className="ip-work-art" aria-label={"Abstract visual for " + project.title} role="img">
                <span className="ip-art-id">ABTECH / {project.index}</span>
                <span className="ip-art-symbol" aria-hidden="true">{project.title === "CareMandate AI" ? "C/" : project.title === "Future Syntax" ? "F*" : project.title === "TaireLuxury" ? "T." : "S↗"}</span>
                <div className="ip-art-lines" />
                <span className="ip-art-footer">PRODUCT THINKING / SYSTEMS DESIGN</span>
              </div>
            </div>
            <div className="ip-study-techrow"><div><span>DISCIPLINE</span><strong>{project.type}</strong></div><div><span>FOCUS</span><strong>{project.eyebrow}</strong></div><div><span>TECHNOLOGY / METHODS</span><strong>{project.stack.join(" · ")}</strong></div></div>
          </div>
        </section>

        <section className="ip-study-section">
          <div className="ip-container">
            <div className="ip-section-label"><span>01</span><span className="ip-label-rule" /><span>THE CONTEXT</span></div>
            <div className="ip-study-two-col">
              <div><span className="ip-eyebrow">THE CHALLENGE</span><h2>Start with the real problem<span className="ip-accent">.</span></h2><p>{story.problem}</p></div>
              <div><span className="ip-eyebrow">THE APPROACH</span><h2>Design for people and systems<span className="ip-accent">.</span></h2><p>{story.approach}</p></div>
            </div>
          </div>
        </section>

        <section className="ip-study-section ip-study-dark">
          <div className="ip-container">
            <div className="ip-section-label"><span>02</span><span className="ip-label-rule" /><span>SYSTEM THINKING</span></div>
            <div className="ip-study-heading"><h2>How it fits<br />together<span className="ip-accent">.</span></h2><p>A conceptual view of the key parts and decisions shaping the work—not a claim of a production architecture audit.</p></div>
            <div className="ip-study-systemgrid">
              {story.systems.map(item => <article key={item.step}>
                <div className="ip-study-system-top"><span>{item.step}</span><Layers3 size={23} strokeWidth={1.5} /></div>
                <h3>{item.name}</h3><p>{item.description}</p>
              </article>)}
            </div>
            <div className="ip-study-principles">
              <div><span className="ip-eyebrow">ENGINEERING PRINCIPLES</span><h3>The details<br />that matter.</h3></div>
              <ul>{story.principles.map(item => <li key={item}><Check size={18} />{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="ip-study-section ip-study-outro">
          <div className="ip-container">
            <div className="ip-section-label"><span>03</span><span className="ip-label-rule" /><span>OUTCOME & CONTEXT</span></div>
            <div className="ip-study-two-col">
              <div><h2>The work is in the thinking<span className="ip-accent">.</span></h2><p>{project.details}</p><div className="ip-study-highlights">{project.highlights.map(item => <div key={item}><Check size={16} />{item}</div>)}</div></div>
              <div className="ip-study-callout"><ShieldCheck size={30} /><span>IMPORTANT CONTEXT</span><p>{story.closing}</p>{project.href && <a href={project.href} target="_blank" rel="noopener noreferrer"><Github size={18} /> Explore the repository <ArrowUpRight size={17} /></a>}</div>
            </div>
          </div>
        </section>

        <section className="ip-study-next"><div className="ip-container">
          <span className="ip-eyebrow">CONTINUE EXPLORING</span>
          <a href={"/work/" + next.slug}><span>Next case study</span><strong>{next.title} <ArrowRight size={33} /></strong></a>
          <div className="ip-study-footer-links"><a href="/#work"><ArrowLeft size={16} /> All selected work</a><a href="/#contact">Start a conversation <ArrowUpRight size={16} /></a></div>
        </div></section>
      </main>
      <footer className="ip-footer"><div className="ip-container"><a className="ip-brand" href="/"><span className="ip-brand-mark" aria-hidden="true">a<span>.</span></span><span className="ip-brand-word">ABTECH<span className="ip-brand-suffix"> / DEV</span></span></a><span>© {new Date().getFullYear()} Lateef Abiodun. Built with purpose.</span><a href="/#top">BACK TO HOME ↑</a></div></footer>
    </div>
  );
}
