/** Verified AutiSmart content from public FYP repo + case study. No invented claims. */

export const AUTISMART = {
  title: 'AutiSmart',
  kicker: 'TEAM FYP · FAST-NUCES · FLAGSHIP',
  subtitle: 'AI-assisted autism assessment and therapy-support platform',
  institution: 'FAST-NUCES, Chiniot-Faisalabad Campus',
  period: '2025–2026',
  grades: 'FYP-I A+ · FYP-II A-',
  contribution: {
    role: 'Full-Stack Development & AI Integration',
    bullets: [
      'Full-stack work across the React frontend and Node.js/Express backend',
      'AI integration using the Groq API (quiz generation, Emotion Explorer)',
      'Authentication and role-based workflows (JWT, OTP via Nodemailer)',
      'Contribution to system architecture, REST APIs, and product workflows',
    ],
  },
  teammates: [
    { name: 'Shayan Ahmad', role: 'Core Engine & Backend Development' },
    { name: 'Ahmad Kamran', role: 'Frontend UI & Systems Logic' },
  ],
  stack: [
    'React 19',
    'Vite 7',
    'Node.js',
    'Express',
    'MongoDB',
    'JWT + RBAC',
    'Groq API',
    'Nodemailer',
  ],
  disclaimer:
    'Academic and assistive software project. Assessments and AI-generated guidance are not a substitute for professional clinical diagnosis or treatment. Not clinically validated.',
  links: {
    caseStudy:
      'https://alishah1029384756.github.io/AliShah1029384756/projects/autismart.html',
    repo: 'https://github.com/AliShah1029384756/Fyp-Autismart',
    demo: 'https://auti-smart-rosy.vercel.app',
  },
} as const

export type StageId =
  | 'assessment'
  | 'data'
  | 'ai'
  | 'therapy'
  | 'roles'
  | 'progress'

export type Stage = {
  id: StageId
  label: string
  title: string
  body: string
  detail: string[]
}

/** Pipeline nodes supported by public documentation only. */
export const STAGES: Stage[] = [
  {
    id: 'assessment',
    label: 'Assessment',
    title: 'Structured assessment',
    body: 'Multi-category autism assessment workflows with result history and level classification.',
    detail: [
      'Six behavioural categories: Eye Contact, Social Interaction, Communication, Repetitive Behavior, Sensory Sensitivity, Focus & Attention',
      'Assessment history and structured result records',
    ],
  },
  {
    id: 'data',
    label: 'Data',
    title: 'Child & caregiver records',
    body: 'Role-aware profiles and management for children linked to caregivers.',
    detail: [
      'Child profiles and caregiver management',
      'Key models: User (role, OTP), Child, Assessment, AssessmentResult, ChildQuiz, Activity',
    ],
  },
  {
    id: 'ai',
    label: 'AI Assist',
    title: 'AI-assisted processing',
    body: 'Groq (Llama 3.3 70B) supports quiz generation and Emotion Explorer content — assistive, not diagnostic.',
    detail: [
      'AI-assisted quiz generation for assessments and personalised child quizzes',
      'Emotion Explorer: AI-generated emotion scenarios and encouraging feedback',
    ],
  },
  {
    id: 'therapy',
    label: 'Therapy',
    title: 'Support workflow',
    body: 'Rule-based therapy-game recommendations derived from assessment category scores.',
    detail: [
      'Therapy-oriented activities and emotion-based exercises',
      'Recommendations ranked from latest assessment scores — not clinical prescription',
    ],
  },
  {
    id: 'roles',
    label: 'Roles',
    title: 'Parent · Expert · Admin',
    body: 'JWT authentication with role-based access for Caregivers, Experts, and Administrators.',
    detail: [
      'Email OTP via Nodemailer',
      'Dashboards oriented to each role’s workflows',
    ],
  },
  {
    id: 'progress',
    label: 'Progress',
    title: 'Tracking & reports',
    body: 'Progress tracking, statistics, reports, and administrative assessment management.',
    detail: [
      'History and dashboard-oriented views',
      'Platform statistics for administrators',
    ],
  },
]
