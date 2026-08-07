import { PortfolioLab } from '@/components/portfolio-lab'
import { PortfolioNav } from '@/components/portfolio-nav'

const whyCards = [
  ['01', 'Documentation-first engineer', 'Every project ships with clear docs, not just code. It is the most consistent habit across everything I build.'],
  ['02', 'Teaching background', '100+ students taught and 20+ mentored one-on-one means I explain and collaborate clearly because I have had to, repeatedly.'],
  ['03', 'AI-native workflow', 'I use AI as an engineering partner for research, review, and documentation while owning every technical decision myself.'],
  ['04', 'Real-world problem focus', 'My flagship projects target healthcare and education systems, not toy apps.'],
  ['05', 'Tested, not just built', 'Automated testing is baked into my projects. A 39-test suite backs my authentication system alone.'],
]

type FlagshipProject = {
  name: string
  type: string
  eyebrow: string
  tech: string[]
  problem: string
  solution: string
  result: string
  request?: boolean
  href?: string
}

type NotableProject = [string, string, string[], string]

const flagshipProjects: FlagshipProject[] = [
  { name: 'AutiSmart', type: 'Private', eyebrow: 'Multimodal AI platform for ASD detection & therapy', tech: ['React', 'Node.js', 'MongoDB', 'Python', 'OpenCV', 'MediaPipe'], problem: 'Early and middle-stage ASD assessment and therapy planning were fragmented across disconnected workflows.', solution: 'A full-stack healthcare platform with multimodal AI, role-based workflows for doctors, therapists, and parents, adaptive therapy recommendations, and structured progress reporting.', result: 'A unified, trackable system covering the full detection-to-therapy lifecycle. Final Year Project with an IEEE-format research paper.', request: true },
  { name: 'ClinicOS', type: 'Private', eyebrow: 'Clinic operations platform', tech: ['React', 'Node.js', 'MySQL'], problem: 'Manual clinic operations caused scheduling and billing inconsistencies.', solution: 'A unified appointment-to-billing operational flow with scheduling modules and billing workflows.', result: 'Shifted core clinic operations from manual to systemized execution.', request: true },
  { name: 'SchoolIEP', type: 'Private', eyebrow: 'School-based IEP management platform', tech: ['React', 'Node.js', 'MySQL', 'RBAC'], problem: 'Individualized Education Plan documentation and follow-up tracking lacked consistency.', solution: 'Role-based permissions and document workflows for compliance-aware IEP record management.', result: 'A structured, auditable record lifecycle aligned with school compliance requirements.', request: true },
  { name: 'EduConnect', type: 'Public', eyebrow: 'Student support & academic community platform', tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'], problem: 'Student support services were fragmented across disconnected channels.', solution: 'A unified portal combining discussion forums, counseling workflows, resource sharing, and an admin analytics dashboard.', result: 'A single access point for students to get both academic and community support.', href: 'https://github.com/AliShah1029384756/EduConnect' },
]

const notableProjects: NotableProject[] = [
  ['Node.js Authentication System', 'Production-style backend auth with a 39-test suite', ['Mocha', 'Chai', 'Supertest'], 'https://github.com/AliShah1029384756/node-authentication'],
  ['Multiplayer Chess Game', 'Real-time networked chess with spectator mode', ['Node.js', 'React', 'Socket.IO'], 'https://github.com/AliShah1029384756/chess-game'],
  ['Custom Multi-Stage Compiler', 'Lexer → Parser → Semantic Analyzer → IR Generator', ['Lex', 'Yacc', 'C', 'Python'], 'https://github.com/AliShah1029384756/compiler-project'],
  ['MERN E-Commerce Platform', 'Full-stack e-commerce with admin panel', ['React', 'Express', 'MongoDB'], 'https://github.com/AliShah1029384756/ecommerce-website'],
  ['P2P Communication System', 'Distributed file sharing and communication', ['Node.js', 'React'], 'https://github.com/AliShah1029384756/p2p-communication-system'],
  ['Bus Schedule Optimizer', 'Operations research applied to transit scheduling', ['Python', 'Pygame'], 'https://github.com/AliShah1029384756/bus-schedule-optimizer'],
]

const hubs = [
  ['EduCore Open Learning Hub', '400+ curated links for Pakistani students across all levels.', 'https://alishah1029384756.github.io/educore-open-learning-hub/'],
  ['Web Dev Learning Hub', 'A 9-module curriculum from HTML to full-stack.', 'https://alishah1029384756.github.io/web-dev-learning-hub/'],
  ['University Course Projects Hub', '16 academic projects across 9 CS domains.', 'https://alishah1029384756.github.io/university-course-projects-hub/'],
  ['High-Impact Student Projects Hub', '58+ guides across beginner, interview, FAST, and AI/ML paths.', 'https://alishah1029384756.github.io/high-impact-student-projects-hub/'],
  ['FAST-NUCES Resources Hub', 'Semester notes, past papers, course links, and SGPA calculator.', 'https://alishah1029384756.github.io/fast-nuces-resources/'],
]

const skillGroups = [
  ['Languages', 'JavaScript (ES6+), Python, C++, C, SQL, Java, x86 Assembly, R'],
  ['Frontend', 'React.js, HTML5, CSS3, Bootstrap, Tailwind CSS, jQuery, AJAX'],
  ['Backend', 'Node.js, Express.js, REST APIs, MVC, JWT/Sessions, Socket.IO, bcryptjs'],
  ['Databases', 'MongoDB/Mongoose, MySQL, Oracle, Entity Framework'],
  ['AI / ML', 'PyTorch, TensorFlow, Keras, CNNs, GANs, VAE+U-Net, OpenCV, MediaPipe, Prompt Engineering'],
  ['Cloud & DevOps', 'AWS EC2, Docker, Ceph, Prometheus, Grafana'],
  ['Business Intelligence', 'Power BI, Power Query, DAX'],
  ['Tools', 'Git, GitHub, VS Code, Postman, VirtualBox, Cisco Packet Tracer, Kali Linux'],
]

export default function Page() {
  return (
    <main id="top">
      <PortfolioNav />
      <PortfolioLab />
      <section className="hero shell legacy-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker">BSCS Graduate · FAST-NUCES, 2026</p>
          <p className="status">Digital Marketing Intern at Atlas Honda Pakistan</p>
          <h1 id="hero-title">I build systems that <em>make complex work clearer.</em></h1>
          <p className="hero-lede">Full-Stack Software Engineer · AI-Assisted Developer · Technical Mentor</p>
          <p className="hero-description">I build full-stack systems for healthcare and education — and I document every decision along the way.</p>
          <div className="button-row"><a className="button button-primary" href="#projects">View projects <span>↗</span></a><a className="button button-quiet" href="#contact">Contact me <span>↗</span></a></div>
          <p className="availability"><span className="pulse" /> Open to software engineering, backend, and full-stack roles · Faisalabad / Lahore / Islamabad</p>
        </div>
        <div className="hero-index" aria-label="Portfolio overview"><span>PORTFOLIO / 2026</span><div className="index-line" /><span>01 — 09</span></div>
      </section>

      <section className="metrics shell" aria-label="Impact metrics">
        {[['100+', 'students taught'], ['20+', 'students mentored'], ['17+', 'projects published'], ['5', 'learning hubs built'], ['39', 'automated tests'], ['400+', 'curated resources']].map(([number, label]) => <div className="metric" key={label}><strong>{number}</strong><span>{label}</span></div>)}
      </section>

      <section id="about" className="section shell split-section"><div className="section-label">01 / About</div><div className="section-content"><h2>Systems thinker first, <em>coder second.</em></h2><p className="large-copy">I&apos;m a systems thinker before I&apos;m a coder. My instinct isn&apos;t just to build something that works — it&apos;s to understand the whole system, document the decisions, and make it reusable for the next person.</p><p>That habit shows up everywhere: in my flagship project AutiSmart, in the five learning hubs I built for other students, and in the fact that I test what I ship instead of hoping it holds up. I taught computer science to 100+ students while finishing my own degree, so I&apos;ve had to explain hard ideas clearly, over and over, until they land.</p><div className="focus-callout"><span>Current focus</span><p>Deepening engineering fundamentals in Docker, PostgreSQL, Redis, authentication hardening, automated testing, CI/CD, AWS, and system design — moving from collecting frameworks to production-engineering depth.</p></div></div></section>

      <section className="section section-muted"><div className="shell"><div className="section-label">02 / Why work with me</div><div className="section-heading"><h2>Good engineering is <em>shared context.</em></h2><p>Building is only half the job. The other half is making the work understandable, reliable, and useful to the people around it.</p></div><div className="why-grid">{whyCards.map(([number, title, body]) => <article className="why-card" key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

      <section id="projects" className="section shell"><div className="section-label">03 / Selected work</div><div className="section-heading"><h2>Four systems, <em>four real problems.</em></h2><p>Healthcare, education, and operations — built around workflows people actually need.</p></div><div className="flagship-grid">{flagshipProjects.map((project) => <article className="project-card" key={project.name}><div className="project-top"><span className="project-type">{project.type}</span><span className="project-arrow">↗</span></div><p className="eyebrow">{project.eyebrow}</p><h3>{project.name}</h3><div className="project-details"><div><b>Problem</b><p>{project.problem}</p></div><div><b>Solution</b><p>{project.solution}</p></div><div><b>Result</b><p>{project.result}</p></div></div><div className="tag-row">{project.tech.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="text-link" href={project.request ? '#contact' : project.href} target={project.request ? undefined : '_blank'} rel={project.request ? undefined : 'noreferrer'}>{project.request ? 'Source available on request' : 'View repository'} <span>↗</span></a></article>)}</div></section>

      <section className="section section-muted"><div className="shell"><div className="section-label">04 / More work</div><div className="small-project-grid">{notableProjects.map(([name, description, tags, href]) => <a className="small-project" href={href} target="_blank" rel="noreferrer" key={name}><div><h3>{name}</h3><p>{description}</p></div><span className="project-arrow">↗</span><div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></a>)}</div></div></section>

      <section className="section shell"><div className="section-label">05 / Learning systems</div><div className="section-heading"><h2>Building for the people <em>still learning.</em></h2><p>Open resources and structured pathways designed to turn scattered information into momentum.</p></div><div className="hub-grid">{hubs.map(([name, description, href]) => <a className="hub-card" href={href} target="_blank" rel="noreferrer" key={name}><span>Open hub ↗</span><h3>{name}</h3><p>{description}</p></a>)}</div></section>

      <section id="skills" className="section section-muted"><div className="shell"><div className="section-label">06 / Toolkit</div><div className="section-heading"><h2>Tools for <em>the whole system.</em></h2></div><div className="skills-grid">{skillGroups.map(([name, skills]) => <div className="skill-group" key={name}><h3>{name}</h3><p>{skills}</p></div>)}</div></div></section>

      <section id="experience" className="section shell split-section"><div className="section-label">07 / Experience</div><div className="timeline"><article className="timeline-item"><span className="timeline-date">Jul 2026 — Present</span><h3>Digital Marketing Intern</h3><p className="company">Atlas Honda Pakistan · Lahore</p><ul><li>Power BI, Power Query, and dashboard development for marketing analytics.</li><li>Completed Microsoft&apos;s PL-300 Power BI learning path.</li><li>Building in-house reporting dashboards for real business use.</li></ul></article><article className="timeline-item"><span className="timeline-date">Aug 2022 — Present</span><h3>CS Teacher · Lab In-Charge · Hostel Warden</h3><p className="company">Al Bethat Trust Boys School &amp; College</p><ul><li>Taught CS fundamentals and programming to 100+ students.</li><li>Managed daily computer lab operations and technical support.</li><li>Oversaw hostel operations for 20+ residents and mentored 20+ juniors.</li></ul></article></div></section>

      <section className="section section-muted"><div className="shell two-column"><div><div className="section-label">08 / Education</div><h2>Grounded in <em>fundamentals.</em></h2></div><div className="education"><h3>Bachelor of Science in Computer Science</h3><p>FAST – National University of Computer and Emerging Sciences<br />Chiniot-Faisalabad Campus · Batch 2022 — Graduated 2026</p><p><b>Final Year Project:</b> AutiSmart — Multimodal AI Platform for ASD Detection &amp; Therapy.</p><p><b>Prior education:</b> F.Sc. Pre-Engineering, BISE Gujranwala.</p></div></div></section>

      <section className="section shell achievements"><div className="section-label">09 / Achievements</div><div className="achievement-row"><div><strong>100+</strong><p>students taught</p></div><div><strong>20+</strong><p>students mentored</p></div><div><strong>39</strong><p>auth tests shipped</p></div><div><strong>400+</strong><p>resources curated</p></div></div></section>

      <section id="contact" className="contact-section"><div className="shell contact-inner"><div><p className="kicker">Let&apos;s build something useful</p><h2>Open to roles where <em>the work matters.</em></h2><p>Software engineering, backend, and full-stack opportunities — especially where good systems can improve healthcare, education, or everyday operations.</p></div><div className="contact-links"><a href="mailto:shahyed99@gmail.com"><span>Email</span>shahyed99@gmail.com <b>↗</b></a><a href="https://www.linkedin.com/in/syed-muhammad-ali-naqvi-1a9576331" target="_blank" rel="noreferrer"><span>LinkedIn</span>Connect with me <b>↗</b></a><a href="https://github.com/AliShah1029384756" target="_blank" rel="noreferrer"><span>GitHub</span>AliShah1029384756 <b>↗</b></a></div></div></section>
      <footer className="site-footer"><div className="shell"><span>Syed Muhammad Ali Naqvi</span><span>Built with Next.js · 2026</span></div></footer>
    </main>
  )
}
