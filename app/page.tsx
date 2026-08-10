import { SpaceProfile } from '@/components/space-profile'

export default function Page() {
  return (
    <main id="top">
      <SpaceProfile />
      <section className="accessible-fallback shell portfolio-content" aria-label="Portfolio content">
        <p className="kicker">Syed Muhammad Ali Naqvi · FAST-NUCES Graduate 2026</p>
        <h2>Full-Stack Software Engineer building systems that make complex work clearer.</h2>
        <p>Explore the immersive lab above, or jump to the portfolio content below.</p>
        <nav className="fallback-links" aria-label="Portfolio sections">
          <a href="#about">About</a><a href="#projects">Work</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
      </section>
      <section id="about" className="accessible-fallback shell"><h2>About</h2><p>Systems thinker before coder. I build healthcare and education systems, document decisions, and teach technical concepts clearly.</p></section>
      <section id="projects" className="accessible-fallback shell"><h2>Selected work</h2><p>AutiSmart, ClinicOS, SchoolIEP, and EduConnect are the four flagship systems in the lab.</p></section>
      <section id="skills" className="accessible-fallback shell"><h2>Skills</h2><p>JavaScript, Python, React, Node.js, MongoDB, MySQL, AI/ML, testing, Docker, AWS, and system design.</p></section>
      <section id="experience" className="accessible-fallback shell"><h2>Experience</h2><p>Digital Marketing Intern at Atlas Honda Pakistan and CS Teacher, Lab In-Charge, and Hostel Warden at Al Bethat Trust Boys School &amp; College.</p></section>
      <section id="contact" className="accessible-fallback shell"><h2>Contact</h2><a href="mailto:shahyed99@gmail.com">shahyed99@gmail.com</a></section>
    </main>
  )
}

export const dynamic = 'force-static'
