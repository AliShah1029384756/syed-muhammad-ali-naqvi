export const PROFESSIONAL = 'https://alishah1029384756.github.io/AliShah1029384756/'
export const CV =
  'https://alishah1029384756.github.io/AliShah1029384756/assets/Syed-Muhammad-Ali-Naqvi-Resume.pdf'
export const GITHUB = 'https://github.com/AliShah1029384756'
export const LINKEDIN = 'https://www.linkedin.com/in/ali-naqvi-1a9576331'
export const CONTACT = 'mailto:shahyed99@gmail.com'
export const PROJECTS = 'https://alishah1029384756.github.io/AliShah1029384756/projects.html'
export const AUTISMART_CASE =
  'https://alishah1029384756.github.io/AliShah1029384756/projects.html#autismart'
export const EDUCORE = 'https://alishah1029384756.github.io/educore-open-learning-hub/index.html'
export const UNI_HUB =
  'https://github.com/AliShah1029384756/university-course-projects-hub'

export type ZoneId =
  | 'engineering'
  | 'ai'
  | 'academy'
  | 'knowledge'
  | 'journey'
  | 'career'

export type Zone = {
  id: ZoneId
  label: string
  angle: number
  title: string
  kicker: string
  body: string
  points: string[]
  links: { label: string; href: string }[]
}

export const ZONES: Zone[] = [
  {
    id: 'engineering',
    label: 'ENGINEERING',
    angle: 0,
    title: 'Engineering Lab',
    kicker: 'SYSTEMS · ARCHITECTURE · FULL-STACK',
    body: 'Practical full-stack systems: React, Node.js, Express, MongoDB, REST APIs, authentication, and structured product workflows. ClinicOS is the deep experience in this zone — patients, sessions, treatment plans, and role-aware access.',
    points: [
      'ClinicOS — patients, sessions, treatment plans, progress, JWT + RBAC',
      'Stack focus: React, Vite, Node.js, Express, MongoDB, Mongoose',
      '17+ university projects across systems, databases, networking, compilers, algorithms',
    ],
    links: [
      { label: 'Project directory', href: PROJECTS },
      { label: 'Professional portfolio', href: PROFESSIONAL },
    ],
  },
  {
    id: 'ai',
    label: 'AI / HEALTHCARE',
    angle: Math.PI / 3,
    title: 'AI / Healthcare Lab',
    kicker: 'FLAGSHIP · TEAM FYP · RESPONSIBLE AI',
    body: 'AutiSmart is the flagship: a team Final Year Project at FAST-NUCES — an AI-assisted autism assessment and therapy-support platform. Contribution is full-stack development and AI integration, consistent with public documentation. Not clinical validation or sole ownership.',
    points: [
      'Child management, assessments, progress tracking',
      'AI-powered recommendations (Groq), reports, therapy-oriented activities',
      'Stack: React, Vite, Node.js, Express, MongoDB, JWT',
      'Supporting: ClinicOS healthcare workflows',
    ],
    links: [
      { label: 'AutiSmart case study', href: AUTISMART_CASE },
      { label: 'FYP repository', href: 'https://github.com/AliShah1029384756/Fyp-Autismart' },
    ],
  },
  {
    id: 'academy',
    label: 'ACADEMY',
    angle: (2 * Math.PI) / 3,
    title: 'Academy',
    kicker: 'EDUCATION SYSTEMS · TEACH · MENTOR',
    body: 'Education-domain engineering and mentoring in one zone. SchoolIEP is the structured IEP / goals / parent-coordination system; alongside it, public mentoring and learning resources for CS students.',
    points: [
      'SchoolIEP — student records, IEP lifecycle, goals, progress, parent coordination',
      '3+ years supporting students in CS and technical projects',
      '20+ students mentored; EduCore and learning hubs',
    ],
    links: [
      { label: 'EduCore learning hub', href: EDUCORE },
      { label: 'Professional site', href: PROFESSIONAL },
    ],
  },
  {
    id: 'knowledge',
    label: 'KNOWLEDGE',
    angle: Math.PI,
    title: 'Knowledge Archive',
    kicker: 'CURATE · DOCUMENT · PRESERVE',
    body: 'A documentation mindset: curated links, open learning hubs, and academic project references so knowledge stays findable. The central axis in this hall is a reminder of that habit — stacked, ordered, durable.',
    points: [
      'EduCore — 400+ curated educational links',
      'Web Development Hub — 9-module pathway toward full-stack practice',
      'High-impact project guides and university course project hub',
    ],
    links: [
      { label: 'EduCore', href: EDUCORE },
      { label: 'University projects hub', href: UNI_HUB },
    ],
  },
  {
    id: 'journey',
    label: 'JOURNEY',
    angle: (4 * Math.PI) / 3,
    title: 'Journey',
    kicker: 'PATH · NOT INFLATED TIMELINE',
    body: 'A restrained chronological path. No invented metrics. Source of truth is the professional site and public repos.',
    points: [
      '2022–2026 · BSCS, FAST-NUCES (Chiniot-Faisalabad Campus)',
      'Teaching & mentoring alongside coursework',
      'AutiSmart team FYP — publicly documented case study',
      'Current: Digital Marketing Intern, Atlas Honda Pakistan',
      'Actively strengthening software engineering and data/BI profile',
    ],
    links: [
      { label: 'About', href: 'https://alishah1029384756.github.io/AliShah1029384756/about.html' },
      { label: 'Professional portfolio', href: PROFESSIONAL },
    ],
  },
  {
    id: 'career',
    label: 'CAREER',
    angle: (5 * Math.PI) / 3,
    title: 'Career Terminal',
    kicker: 'DIRECT ROUTES · RECRUITER-FIRST',
    body: 'One-click paths for hiring managers. The immersive world is optional; proof is always available without exploring 3D space.',
    points: [
      'Open to software engineering, full-stack, data/BI, AI/healthcare collaboration',
      'CV, GitHub, LinkedIn, and contact stay in the top bar at every stage',
    ],
    links: [
      { label: 'CV (PDF)', href: CV },
      { label: 'GitHub', href: GITHUB },
      { label: 'LinkedIn', href: LINKEDIN },
      { label: 'Email', href: CONTACT },
    ],
  },
]
