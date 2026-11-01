import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Check, Code2, GraduationCap, Github, Globe2, Mail, Menu, Moon, Send, Sun, X } from 'lucide-react';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/mnalambd09', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/noor-alam-ab69b3153/', icon: BriefcaseBusiness },
  { label: 'Facebook', href: 'https://www.facebook.com/mnalambd09', icon: Globe2 },
];
const skills = [
  { name: 'HTML', level: 92, group: 'Web development' }, { name: 'CSS', level: 90, group: 'Web development' },
  { name: 'JavaScript', level: 78, group: 'Web development' }, { name: 'React', level: 80, group: 'Web development' },
  { name: 'Git', level: 76, group: 'Web development' }, { name: 'GitHub', level: 76, group: 'Web development' },
  { name: 'Piping & Supervision', level: 95, group: 'Engineering' }, { name: 'Project Management', level: 90, group: 'Engineering' },
  { name: 'Korean Language & Admin', level: 90, group: 'Languages' },
];
const projects = [
  { title: 'JUNJE Website', category: 'Web development', number: '01', description: 'Mechanical project management and administration portal.', stack: ['React', 'JavaScript', 'Operations'], href: 'https://mnalambd09.github.io/junje-website/', visual: 'project-amber' },
  { title: 'Md-nooralam Profile', category: 'Web development', number: '02', description: 'An interactive career guide and personal portfolio showcase.', stack: ['Web design', 'Portfolio', 'Responsive'], href: 'https://mnalambd09.github.io/Md-nooralam/', visual: 'project-violet' },
];
const experience = [
  { dates: '2023 — Present', company: 'Hyundai Samho Heavy Industries', role: 'Mechanical Piping Work', location: 'South Korea', href: 'https://www.hshi.co.kr/' },
  { dates: '2021 — 2022', company: 'Samsung Engineering & Construction', role: 'Supervisor · Terminal 3', location: 'Dhaka, Bangladesh', href: 'https://www.secc.co.kr/' },
  { dates: '2013 — 2021', company: 'Hanwha Engineering', role: 'Admin · Korean Team, JUNJE Team', location: 'Iraq', href: 'https://www.hanwha.com/' },
  { dates: '2013 · 6 months', company: 'Grameen Shakti', role: 'Field Assistant · Solar Energy', location: 'Bangladesh', href: 'https://www.gshakti.org/' },
  { dates: '2009 — 2011', company: 'Won Engineering', role: 'Computer Operator & Admin', location: 'Libya', href: 'http://won-eng.com/' },
  { dates: '2008 · 7 months', company: 'Diamond Mechanical Engineering', role: 'Pipe Fitter · Industrial Project', location: 'Bangladesh', href: 'https://www.graphicstextiles.com/' },
  { dates: '2007 — 2008', company: 'Shapla Mechanical Engineering', role: 'Piping Helper · Cotton Mills', location: 'Bangladesh', href: 'http://naheedgroup.com/' },
];
const education = [
  { year: '2013', title: 'Bachelor of Social Science (B.S.S)', school: 'Brahmanbaria Government College', detail: 'Degree information reproduced from the reference portfolio.' },
  { year: '2009 — 2012', title: 'Higher Secondary Certificate (HSC)', school: 'Alhaj Begum Nurunnahar College', detail: 'Business Studies' },
  { year: '2007', title: 'Secondary School Certificate (SSC)', school: 'Talshahar High School', detail: 'Science' },
];
const navItems = [['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Experience', '#experience'], ['Contact', '#contact']];

function SectionLabel({ children, number }) { return <p className="section-label"><span>{number}</span>{children}</p>; }
function Reveal({ children, className = '', delay = 0 }) { return <div className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>{children}</div>; }
function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  return <header className="header"><a className="brand" href="#top" aria-label="Noor Alam home"><span className="brand-icon">N<span>.</span></span><span>NOOR ALAM<small>SUPERVISOR · DEVELOPER</small></span></a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a></nav>
    <button className="theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
  </header>;
}
function SkillCard({ skill, index }) { return <Reveal delay={index * 65}><article className="skill-card"><div className="skill-top"><span className="skill-dot" /><span>{skill.group}</span><span className="skill-level">{skill.level}%</span></div><h3>{skill.name}</h3><div className="skill-track" role="progressbar" aria-label={`${skill.name} proficiency`} aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100"><span style={{ '--level': `${skill.level}%` }} /></div></article></Reveal>; }
function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  function submit(event) {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (values.message.trim().length < 12) next.message = 'Please add a little more detail (12 characters minimum).';
    setErrors(next);
    if (Object.keys(next).length) return;
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(`Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`);
    window.location.href = `mailto:mnalambd09@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return <form className="contact-form" onSubmit={submit} noValidate>
    <label>Your name<input value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Name" />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</label>
    <label>Email address<input type="email" value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@example.com" />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</label>
    <label>Your message<textarea rows="4" value={values.message} onChange={e => setValues({ ...values, message: e.target.value })} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="Tell me a little about what you have in mind…" />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</label>
    <div className="form-bottom"><button className="button button-primary" type="submit">{sent ? 'Open your email app' : 'Send a message'}{sent ? <Check size={16} /> : <Send size={15} />}</button><span>Your email app will open to send your message.</span></div>
  </form>;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [filter, setFilter] = useState('All projects');
  const filteredProjects = useMemo(() => filter === 'All projects' ? projects : projects.filter(project => project.category === filter), [filter]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div className="site-shell" id="top">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <Header theme={theme} setTheme={setTheme} />
    <main>
      <section className="hero section-wrap" id="about"><div className="hero-copy"><p className="eyebrow"><span className="availability-dot" /> OPEN TO THE RIGHT OPPORTUNITIES <span className="eyebrow-rule" /></p><h1>মোঃ নূরআলম<span className="hero-name-en">MD. NOOR ALAM</span><span className="hero-title">Building across<br /><em>two worlds.</em></span></h1><p className="hero-description">A supervisor and developer combining 16 years of international mechanical engineering experience with a growing passion for modern web technology.</p><div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={16} /></a><a className="button button-quiet" href="#contact">Get in touch <ArrowDown size={15} /></a></div><div className="hero-socials" aria-label="Social links">{socialLinks.map(({ label, href, icon: Icon }) => <a href={href} target="_blank" rel="noreferrer" aria-label={label} key={label}><Icon size={16} /></a>)}<a href="mailto:mnalambd09@gmail.com" aria-label="Email"><Mail size={16} /></a></div></div>
        <Reveal className="hero-panel"><div className="panel-top"><span>BASED IN SOUTH KOREA</span><span className="panel-live"><i /> AVAILABLE</span></div><div className="hero-art"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="monogram">N<span>.</span></div><div className="art-caption"><span>ENGINEERING</span><span>×</span><span>DEVELOPMENT</span></div><div className="art-cross cross-one">+</div><div className="art-cross cross-two">+</div></div><div className="panel-bottom"><div><strong>16<span>+</span></strong><small>YEARS EXPERIENCE</small></div><div><strong>07</strong><small>CAREER CHAPTERS</small></div><div><strong>02</strong><small>FEATURED PROJECTS</small></div></div></Reveal>
        <a className="hero-scroll" href="#skills"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      </section>

      <section className="intro section-wrap"><Reveal><SectionLabel number="01">A little about me</SectionLabel><p className="intro-copy">From the complexity of <span>industrial projects</span> to the craft of <span>building for the web</span> — I bring curiosity, care, and a steady hand to everything I do.</p></Reveal><Reveal className="intro-note"><p>My career has taken me across Bangladesh, Iraq, Libya, and South Korea. Each chapter shaped how I solve problems, work with people, and keep learning.</p><a href="#experience" className="inline-link">A career built on experience <ArrowDown size={14} /></a></Reveal></section>

      <section className="skills-section section-wrap" id="skills"><div className="section-heading"><Reveal><SectionLabel number="02">Skills & expertise</SectionLabel><h2>Practical skills.<br /><em>Real-world experience.</em></h2></Reveal><Reveal><p className="section-aside">A growing toolkit for the digital world, grounded in years of hands-on work across engineering, operations, and international teams.</p></Reveal></div><div className="skills-grid">{skills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}</div><p className="skills-footnote"><span>*</span> Skill levels are self-assessed and can be edited in <code>src/App.jsx</code>.</p></section>

      <section className="projects-section section-wrap" id="projects"><div className="section-heading"><Reveal><SectionLabel number="03">Selected projects</SectionLabel><h2>Ideas, made <em>useful.</em></h2></Reveal><div className="project-filters" role="group" aria-label="Filter projects">{['All projects', 'Web development'].map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={filter === item ? 'active' : ''}>{item}<span>{item === 'All projects' ? projects.length : projects.filter(p => p.category === item).length}</span></button>)}</div></div><div className="projects-grid">{filteredProjects.map((project, index) => <Reveal key={project.title} delay={index * 110}><article className="project-card"><div className={`project-visual ${project.visual}`}><span className="project-index">PROJECT / {project.number}</span><div className="mock-window"><div className="mock-bar"><i /><i /><i /><span>{project.title.toLowerCase().replaceAll(' ', '-')}</span></div><div className="mock-content"><div className="mock-sidebar"><b>N<span>.</span></b><i /><i /><i /></div><div className="mock-main"><span className="mock-kicker">{project.number} — PORTFOLIO</span><strong>{project.title}</strong><div className="mock-lines"><i /><i /><i /></div><div className="mock-cards"><i /><i /><i /></div></div></div></div><span className="visual-tag">{project.category}</span></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div><a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ArrowUpRight size={19} /></a></div></article></Reveal>)}</div></section>

      <section className="experience-section section-wrap" id="experience"><div className="section-heading"><Reveal><SectionLabel number="04">Work experience</SectionLabel><h2>A global career,<br /><em>built step by step.</em></h2></Reveal><Reveal><p className="section-aside">Sixteen years working alongside teams on industrial, mechanical, energy, and construction projects.</p></Reveal></div><div className="timeline">{experience.map((item, index) => <Reveal key={item.company} delay={Math.min(index * 45, 180)}><article className="timeline-item"><div className="timeline-date">{item.dates}</div><div className="timeline-marker"><span /></div><div className="timeline-content"><div><h3>{item.company}</h3><p>{item.role}</p><span className="timeline-location">{item.location}</span></div><a href={item.href} target="_blank" rel="noreferrer" aria-label={`Visit ${item.company} website`}><ArrowUpRight size={17} /></a></div></article></Reveal>)}</div></section>

      <section className="education-section section-wrap" id="education"><div className="education-intro"><Reveal><SectionLabel number="05">Education & learning</SectionLabel><h2>Always a<br /><em>student.</em></h2><p>Formal education gave me a foundation. Hands-on work and an ongoing curiosity keep me moving forward.</p><div className="learning-note"><Code2 size={18} /><span>Currently growing in<small>Modern web development · React · JavaScript</small></span></div></Reveal></div><div className="education-list">{education.map((item, index) => <Reveal key={item.year} delay={index * 90}><article className="education-card"><span className="education-icon"><GraduationCap size={20} /></span><span className="education-year">{item.year}</span><div><h3>{item.title}</h3><p>{item.school}</p><span>{item.detail}</span></div></article></Reveal>)}</div></section>

      <section className="contact-section section-wrap" id="contact"><div className="contact-intro"><Reveal><SectionLabel number="06">Get in touch</SectionLabel><h2>Have something<br />good in <em>mind?</em></h2><p>For project conversations, professional opportunities, or a friendly hello — I’d be glad to hear from you.</p><a className="email-link" href="mailto:mnalambd09@gmail.com"><Mail size={17} />mnalambd09@gmail.com<ArrowUpRight size={15} /></a><a className="phone-link" href="tel:+821022162484">+82 10-2216-2484</a><div className="contact-socials">{socialLinks.map(({ label, href, icon: Icon }) => <a href={href} target="_blank" rel="noreferrer" key={label}><Icon size={15} />{label}<ArrowUpRight size={12} /></a>)}</div></Reveal></div><Reveal className="form-wrap"><div className="form-heading"><span>01 / SAY HELLO</span><span>Usually reply within 2 days</span></div><ContactForm /></Reveal></section>
    </main>
    <footer className="footer section-wrap"><a className="brand" href="#top"><span className="brand-icon">N<span>.</span></span><span>NOOR ALAM<small>SUPERVISOR · DEVELOPER</small></span></a><span className="footer-note">Built with care, one step at a time.</span><span className="footer-copy">© {new Date().getFullYear()} Md. Noor Alam</span><a className="back-top" href="#top">Back to top <ArrowUpRight size={14} /></a></footer>
  </div>;
}
