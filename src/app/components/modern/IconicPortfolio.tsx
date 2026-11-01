import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, Check,
  CheckCircle2, Code2, Database, Github, GraduationCap, Layers3,
  Linkedin, Mail, MapPin, Menu, Send, ShieldCheck, Terminal, Workflow, X,
} from "lucide-react";
import { useData, type Project } from "../../contexts/DataContext";
import "../../../styles/iconic-portfolio.css";

type WorkCategory = "All" | "Systems" | "AI & impact" | "Commerce" | "Analytics";
type CaseStudy = {
  title: string;
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

const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    title: "CareMandate AI",
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
    type: "Analytics",
    eyebrow: "Mobility / Data storytelling",
    summary: "Turning public transport data into better decisions.",
    details: "A Lagos transportation analytics hackathon project studying trip reliability, arrival delays, cancellations, fleet availability and maintenance patterns through an executive-facing dashboard.",
    stack: ["Power BI", "Data analysis", "Next.js"],
    highlights: ["Operational performance metrics", "Route-level insights", "Decision-focused storytelling"],
    appearance: "move"
  }
];

const FILTERS: WorkCategory[] = ["All", "Systems", "AI & impact", "Commerce", "Analytics"];

function safeUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="ip-section-label"><span>{number}</span><span className="ip-label-rule" /><span>{children}</span></div>;
}

function Brand({ fullName }: { fullName: string }) {
  return (
    <a className="ip-brand" href="#top" aria-label={fullName + " — back to top"}>
      <span className="ip-brand-mark" aria-hidden="true">a<span>.</span></span>
      <span className="ip-brand-word">ABTECH<span className="ip-brand-suffix"> / DEV</span></span>
    </a>
  );
}

function PortfolioNav({ fullName }: { fullName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const sections = [
    { label: "Work", href: "#work" },
    { label: "Expertise", href: "#expertise" },
    { label: "Story", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];
  useEffect(() => {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [isOpen]);
  return (
    <header className="ip-header">
      <div className="ip-header-inner">
        <Brand fullName={fullName} />
        <nav className={"ip-nav" + (isOpen ? " ip-nav-open" : "")} aria-label="Main navigation" id="portfolio-navigation">
          {sections.map((section, i) => (
            <a href={section.href} onClick={() => setIsOpen(false)} key={section.href}>
              <span className="ip-nav-index">0{i + 1}</span> {section.label}
            </a>
          ))}
          <a className="ip-nav-teaching" href="/teaching" onClick={() => setIsOpen(false)}>Teaching <ArrowUpRight size={14} /></a>
        </nav>
        <a href="#contact" className="ip-header-action">Let's talk <ArrowUpRight size={17} /></a>
        <button type="button" className="ip-nav-toggle" aria-expanded={isOpen} aria-controls="portfolio-navigation" aria-label={isOpen ? "Close menu" : "Open menu"} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function HeroGraphic() {
  return (
    <div className="ip-hero-graphic" aria-label="Abstract visualization of connected engineering systems" role="img">
      <div className="ip-graphic-grid" />
      <div className="ip-graphic-top"><span>ENGINEERING SYSTEMS</span><span>FIG. 001 — AB</span></div>
      <div className="ip-orbit ip-orbit-one" /><div className="ip-orbit ip-orbit-two" /><div className="ip-orbit ip-orbit-three" />
      <div className="ip-orbit-core"><Code2 size={43} strokeWidth={1.2} /><span>BUILD / THINK / SHIP</span></div>
      <div className="ip-orbit-node ip-node-a">FULL STACK <span>↗</span></div>
      <div className="ip-orbit-node ip-node-b">AI SYSTEMS <span>↗</span></div>
      <div className="ip-orbit-node ip-node-c">DATA <span>↗</span></div>
      <div className="ip-graphic-bottom"><span><span className="ip-pulse-dot" /> INDEPENDENT ENGINEERING</span><span>LAGOS / WORLDWIDE</span></div>
    </div>
  );
}

function WorkCard({ project }: { project: CaseStudy }) {
  return (
    <article className={"ip-work-card ip-work-" + project.appearance}>
      <div className="ip-work-art" aria-hidden="true">
        <span className="ip-art-id">{project.index} / 04</span>
        <span className="ip-art-symbol">{project.title === "CareMandate AI" ? "C/" : project.title === "Future Syntax" ? "F*" : project.title === "TaireLuxury" ? "T." : "S↗"}</span>
        <div className="ip-art-lines" />
        <span className="ip-art-footer">ABTECH — SELECTED SYSTEMS</span>
      </div>
      <div className="ip-work-copy">
        <div className="ip-work-meta"><span>{project.eyebrow}</span><span>{project.index} / 04</span></div>
        <h3>{project.title}</h3>
        <p className="ip-work-summary">{project.summary}</p>
        <div className="ip-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
        <details className="ip-case-details">
          <summary>Explore the work <ArrowDown size={17} /></summary>
          <div className="ip-case-reveal">
            <p>{project.details}</p>
            <ul>{project.highlights.map(item => <li key={item}><Check size={14} />{item}</li>)}</ul>
            {project.href && <a target="_blank" rel="noopener noreferrer" href={project.href}>Explore repository <ArrowUpRight size={16} /></a>}
          </div>
        </details>
      </div>
    </article>
  );
}

function DatabaseProject({ project, onView }: { project: Project; onView: (id: string) => void }) {
  const image = project.media?.find(item => item.type === "image" && safeUrl(item.url));
  const link = safeUrl(project.caseStudyUrl) || safeUrl(project.liveUrl);
  return (
    <article className="ip-db-project">
      <div className="ip-db-project-visual">
        {image ? <img src={image.url} alt={"Preview of " + project.title} loading="lazy" /> : <div className="ip-db-project-letter" aria-hidden="true">{project.title.slice(0, 2).toUpperCase()}</div>}
      </div>
      <div className="ip-db-project-info">
        <span className="ip-eyebrow">{project.category || "Product engineering"}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.tech?.length > 0 && <div className="ip-tags">{project.tech.slice(0, 5).map(t => <span key={t}>{t}</span>)}</div>}
        <details className="ip-case-details">
          <summary>Project details <ArrowDown size={17} /></summary>
          <div className="ip-case-reveal">
            {project.features?.length ? <ul>{project.features.map((feature, i) => <li key={i}><Check size={14} />{feature}</li>)}</ul> : <p>Explore the project through its published links.</p>}
            {link && <a href={link} onClick={() => onView(project.id)} target="_blank" rel="noopener noreferrer">Visit project <ArrowUpRight size={16} /></a>}
          </div>
        </details>
      </div>
    </article>
  );
}

function WorkSection() {
  const { projects, isLoading, incrementProjectView } = useData();
  const [category, setCategory] = useState<WorkCategory>("All");
  const filtered = useMemo(() => category === "All" ? CASE_STUDIES : CASE_STUDIES.filter(item => item.type === category), [category]);
  const archived = projects.filter(project => !CASE_STUDIES.some(study => study.title.toLowerCase() === project.title.trim().toLowerCase()));
  return (
    <section id="work" className="ip-section ip-work-section">
      <div className="ip-container">
        <SectionLabel number="01">THE WORK</SectionLabel>
        <div className="ip-section-heading ip-work-heading">
          <div><h2>Selected work<span className="ip-accent">.</span></h2><p>Not just interfaces. Systems, experiences and ideas built for real people.</p></div>
          <span className="ip-heading-aside">A COLLECTION OF WHAT I BUILD & WHY</span>
        </div>
        <div className="ip-filter-row" role="group" aria-label="Filter selected work">
          {FILTERS.map(value => <button type="button" key={value} className={category === value ? "ip-filter ip-filter-active" : "ip-filter"} onClick={() => setCategory(value)} aria-pressed={category === value}>{value}</button>)}
        </div>
        <div className="ip-work-grid">{filtered.map(project => <WorkCard key={project.title} project={project} />)}</div>
        {isLoading ? <p className="ip-db-state" role="status">Loading additional portfolio projects…</p> : archived.length > 0 && (
          <div className="ip-archive">
            <div className="ip-archive-heading"><h3>More from the archive</h3><span>MANAGED THROUGH THE PORTFOLIO STUDIO</span></div>
            <div className="ip-archive-grid">{archived.map(project => <DatabaseProject key={project.id} project={project} onView={(id) => { void incrementProjectView(id); }} />)}</div>
          </div>
        )}
      </div>
    </section>
  );
}

const capabilities = [
  { number: "01", icon: Layers3, title: "Full-stack engineering", description: "From a carefully designed interface to secure data models, APIs and role-based product workflows.", tags: ["React", "Next.js", "TypeScript", "PostgreSQL"] },
  { number: "02", icon: BrainCircuit, title: "AI & automation", description: "Building thoughtful automation and AI-enabled experiences that solve practical problems.", tags: ["AI integration", "Workflow design", "Intelligent products"] },
  { number: "03", icon: Database, title: "Data & analytics", description: "Making complex data useful through modelling, analysis and decision-ready visual storytelling.", tags: ["Supabase", "SQL", "Power BI", "Analytics"] },
  { number: "04", icon: GraduationCap, title: "Education & impact", description: "Making technical knowledge approachable and helping people build skills with confidence.", tags: ["Mentorship", "STEM education", "Digital literacy"] }
];

function ExpertiseSection() {
  const { skills } = useData();
  return (
    <section id="expertise" className="ip-section ip-expertise-section">
      <div className="ip-container">
        <SectionLabel number="02">WHAT I DO</SectionLabel>
        <div className="ip-section-heading"><div><h2>Depth over noise<span className="ip-accent">.</span></h2><p>Good products look effortless because the hard work happens underneath.</p></div></div>
        <div className="ip-capability-grid">{capabilities.map(item => <article className="ip-capability" key={item.number}>
          <div className="ip-capability-top"><span>{item.number} / EXPERTISE</span><item.icon size={25} strokeWidth={1.4} /></div>
          <h3>{item.title}</h3><p>{item.description}</p>
          <div className="ip-capability-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </article>)}</div>
        {skills.length > 0 && <div className="ip-skills-dynamic"><span className="ip-eyebrow">CURRENT TOOLKIT / FROM THE STUDIO</span><div>{skills.flatMap(s => s.tools || []).filter((tag, i, all) => all.indexOf(tag) === i).map(tag => <span key={tag}>{tag}</span>)}</div></div>}
        <div className="ip-engineering-strip">
          <div><span>HOW I THINK</span><h3>From problem<br />to product.</h3></div>
          <div className="ip-process-track">
            <div><span>01</span><strong>Understand</strong><p>The people, the context, the real problem.</p></div>
            <ArrowRight size={20} aria-hidden="true" />
            <div><span>02</span><strong>Architect</strong><p>Thoughtful, maintainable systems.</p></div>
            <ArrowRight size={20} aria-hidden="true" />
            <div><span>03</span><strong>Ship & evolve</strong><p>Build, test, learn, improve.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { profileData, experience } = useData();
  return (
    <section id="about" className="ip-section ip-about-section">
      <div className="ip-container">
        <SectionLabel number="03">THE PERSON BEHIND THE CODE</SectionLabel>
        <div className="ip-about-grid">
          <div>
            <span className="ip-eyebrow">ENGINEER. EDUCATOR. PROBLEM SOLVER.</span>
            <h2>Built on curiosity.<br /><em>Driven by purpose.</em></h2>
            <p className="ip-about-lead">I'm {profileData.fullName || "Lateef Abiodun"}, a developer based in {profileData.location || "Lagos, Nigeria"} who cares about the people on the other side of every product.</p>
            <p>{profileData.bio || "I design and develop digital systems with a focus on quality, clarity and meaningful impact."}</p>
            <p>My work lives at the intersection of software engineering, intelligent systems, product thinking and education. I believe the best technology should be both powerful and approachable.</p>
            <div className="ip-about-actions">
              {safeUrl(profileData.github) && <a href={safeUrl(profileData.github)} target="_blank" rel="noopener noreferrer"><Github size={19} /> GitHub <ArrowUpRight size={15} /></a>}
              {safeUrl(profileData.linkedin) && <a href={safeUrl(profileData.linkedin)} target="_blank" rel="noopener noreferrer"><Linkedin size={19} /> LinkedIn <ArrowUpRight size={15} /></a>}
              <a href="/teaching"><BookOpen size={19} /> My teaching work <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="ip-about-portrait">
            {safeUrl(profileData.profilePhoto) ? <img src={safeUrl(profileData.profilePhoto)} alt={profileData.fullName} loading="lazy" /> : <div className="ip-monogram-art" aria-label="AB monogram">AB<span>.</span></div>}
            <div className="ip-portrait-caption"><span>THE HUMAN ELEMENT</span><span><MapPin size={14} /> {profileData.location || "Lagos, Nigeria"}</span></div>
          </div>
        </div>
        {experience.length > 0 && <div className="ip-experience">
          <div className="ip-archive-heading"><h3>Experience & perspective</h3><span>THE JOURNEY SO FAR</span></div>
          {experience.map(item => <div className="ip-timeline-row" key={item.id}><span>{item.period}</span><div><h4>{item.role}</h4><strong>{item.company}</strong><p>{item.description}</p></div><ArrowUpRight size={18} /></div>)}
        </div>}
      </div>
    </section>
  );
}

function ContactSection() {
  const { profileData, sendMessage } = useData();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const contactEmail = profileData.email?.trim();
  const whatsapp = profileData.whatsapp?.replace(/\D/g, "");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setNotice(null);
    try {
      const { error } = await sendMessage({ name: form.name.trim(), email: form.email.trim(), subject: form.subject.trim(), message: form.message.trim() });
      if (error) {
        setNotice({ type: "error", text: "Your message could not be sent. Please use email or WhatsApp instead." });
      } else {
        setNotice({ type: "success", text: "Message sent successfully. Thank you for getting in touch." });
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setNotice({ type: "error", text: "The message service is unavailable right now. Please reach out by email." });
    } finally { setPending(false); }
  }
  return (
    <section id="contact" className="ip-section ip-contact-section">
      <div className="ip-container">
        <SectionLabel number="04">LET'S CONNECT</SectionLabel>
        <div className="ip-contact-grid">
          <div className="ip-contact-intro">
            <span className="ip-eyebrow"><span className="ip-pulse-dot" /> OPEN TO MEANINGFUL COLLABORATION</span>
            <h2>Have a big idea?<br /><em>Let's make it real.</em></h2>
            <p>Whether you're building a product, solving a difficult systems problem or creating something with impact, I'd love to hear about it.</p>
            <div className="ip-contact-links">
              {contactEmail && <a href={"mailto:" + contactEmail}><Mail size={20} /><span>{contactEmail}</span><ArrowUpRight size={18} /></a>}
              {whatsapp && <a href={"https://wa.me/" + whatsapp} target="_blank" rel="noopener noreferrer"><Workflow size={20} /><span>Start a WhatsApp conversation</span><ArrowUpRight size={18} /></a>}
              {safeUrl(profileData.linkedin) && <a href={safeUrl(profileData.linkedin)} target="_blank" rel="noopener noreferrer"><Linkedin size={20} /><span>Connect on LinkedIn</span><ArrowUpRight size={18} /></a>}
            </div>
          </div>
          <form className="ip-contact-form" onSubmit={handleSubmit}>
            <div className="ip-form-top"><Terminal size={22} /><span>NEW INQUIRY</span><span>CONTACT / 001</span></div>
            <div className="ip-form-row">
              <label>YOUR NAME <input autoComplete="name" type="text" maxLength={120} required placeholder="How should I call you?" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
              <label>EMAIL ADDRESS <input autoComplete="email" type="email" maxLength={254} required placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
            </div>
            <label>WHAT'S THIS ABOUT? <input type="text" maxLength={180} required placeholder="A project, an idea, a collaboration…" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></label>
            <label>TELL ME MORE <textarea required maxLength={5000} rows={5} placeholder="Tell me a little about what you're building." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></label>
            <button type="submit" disabled={pending}>{pending ? "Sending…" : "Send your message"} <Send size={17} /></button>
            <p className="ip-form-notice" aria-live="polite" role="status">{notice && <span className={notice.type === "error" ? "ip-notice-error" : "ip-notice-success"}>{notice.type === "success" && <CheckCircle2 size={17} />}{notice.text}</span>}</p>
            <p className="ip-form-privacy"><ShieldCheck size={15} /> Your message is sent directly to my portfolio inbox.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function IconicPortfolio() {
  const { profileData, incrementProfileView } = useData();
  const reducedMotion = useReducedMotion();
  const viewCounted = useRef(false);
  useEffect(() => {
    if (viewCounted.current) return;
    viewCounted.current = true;
    void incrementProfileView();
  }, [incrementProfileView]);
  const name = profileData.fullName || "Lateef Abiodun";
  return (
    <div className="ip-root" id="top">
      <Helmet>
        <title>{name} — Full-stack Engineer, AI & Product Builder</title>
        <meta name="description" content={"Discover selected engineering projects, intelligent systems and education initiatives by " + name + ", based in Lagos, Nigeria."} />
        <meta name="theme-color" content="#101115" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={name + " — Engineering what matters"} />
        <meta property="og:description" content="Full-stack engineering, intelligent systems and human-centred products." />
        {safeUrl(profileData.profilePhoto) && <meta property="og:image" content={safeUrl(profileData.profilePhoto)} />}
      </Helmet>
      <a className="ip-skip" href="#main-content">Skip to content</a>
      <PortfolioNav fullName={name} />
      <main id="main-content">
        <section className="ip-hero">
          <div className="ip-container ip-hero-inner">
            <motion.div className="ip-hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <div className="ip-status"><span className="ip-pulse-dot" /> SOFTWARE ENGINEERING / HUMAN IMPACT <span className="ip-status-line" /></div>
              <p className="ip-hero-pretitle">HI, I'M {name.toUpperCase()} <span>↘</span></p>
              <h1>Building what<br /><em>matters.</em></h1>
              <p className="ip-hero-description">I engineer thoughtful digital products, intelligent systems and experiences that make complex things feel simple.</p>
              <div className="ip-hero-actions">
                <a className="ip-button-primary" href="#work">Explore my work <ArrowUpRight size={21} /></a>
                <a className="ip-button-text" href="#contact">Let's collaborate <ArrowRight size={20} /></a>
              </div>
              <div className="ip-hero-bottom"><span><MapPin size={16} /> {profileData.location || "Lagos, Nigeria"}</span><span>DESIGN-LED. ENGINEERING-DRIVEN.</span></div>
            </motion.div>
            <motion.div className="ip-hero-art" initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}><HeroGraphic /></motion.div>
          </div>
          <a className="ip-scroll-hint" href="#work"><ArrowDown size={18} /> SCROLL TO EXPLORE</a>
        </section>
        <div className="ip-ticker" aria-label="Areas of practice"><div className="ip-container"><span>FULL-STACK DEVELOPMENT</span><i /> <span>AI & AUTOMATION</span><i /> <span>DATA ENGINEERING</span><i /> <span>PRODUCT THINKING</span><i /> <span>TECH EDUCATION</span></div></div>
        <WorkSection />
        <ExpertiseSection />
        <AboutSection />
        <ContactSection />
      </main>
      <footer className="ip-footer"><div className="ip-container"><Brand fullName={name} /><span>© {new Date().getFullYear()} {name}. Built with purpose.</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </div>
  );
}
