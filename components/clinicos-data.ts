/** Verified ClinicOS content from public repo README, case study, completion report. */

export const CLINICOS = {
  title: 'ClinicOS',
  kicker: 'FULL-STACK · THERAPY OPERATIONS · RBAC',
  subtitle: 'Therapy operations platform for patients, sessions, treatment plans, and progress',
  framing:
    'Portfolio / academic software project demonstrating full-stack architecture, authentication, RBAC, and healthcare-style workflow management. Not a medical device or clinical system.',
  contribution: {
    framing:
      'Presented as an individual portfolio project. Unlike AutiSmart (team FYP), no separate team-contribution table appears in the public repository.',
    role: 'Full-stack implementation across API, data model, auth, and operational UI',
    bullets: [
      'Backend API design — session, treatment-plan, and therapist route modules',
      'MongoDB / Mongoose data modelling (Session, TreatmentPlan, TherapistProfile)',
      'JWT authentication and role middleware',
      'React frontend with role-aware dashboards and workflow screens',
      'Project documentation (API reference, setup guides, completion notes)',
    ],
  },
  stack: [
    'React 18',
    'Vite',
    'React Router',
    'Context API',
    'Node.js',
    'Express',
    'MongoDB',
    'Mongoose',
    'JWT',
    'RBAC',
  ],
  roles: ['Therapist', 'Admin', 'Caregiver', 'Patient'],
  disclaimer:
    'Academic / software engineering project. Not clinically validated. Not evidence of clinical certification or production healthcare deployment.',
  links: {
    caseStudy:
      'https://alishah1029384756.github.io/AliShah1029384756/projects/clinicos.html',
    repo: 'https://github.com/AliShah1029384756/ClinicOS',
  },
} as const

export type ClinicStageId =
  | 'patient'
  | 'session'
  | 'plan'
  | 'progress'
  | 'access'

export type ClinicStage = {
  id: ClinicStageId
  label: string
  title: string
  body: string
  detail: string[]
}

/** Operations workflow — only nodes supported by public docs/API. */
export const CLINIC_STAGES: ClinicStage[] = [
  {
    id: 'patient',
    label: 'Patient',
    title: 'Patient records',
    body: 'Patient information and therapist-linked workflows for therapy operations.',
    detail: [
      'Patient and therapist workflow management',
      'Therapist profiles: specialization, license, experience, availability',
    ],
  },
  {
    id: 'session',
    label: 'Session',
    title: 'Therapy sessions',
    body: 'Scheduling, status, attendance, duration, and session notes.',
    detail: [
      'Session types: individual, group, assessment, consultation',
      'Status flow: scheduled → completed / cancelled',
      'Filtering and session detail views via REST endpoints',
    ],
  },
  {
    id: 'plan',
    label: 'Plan',
    title: 'Treatment plans',
    body: 'Patient-linked plans with goals, interventions, and plan status.',
    detail: [
      'Goals with status and progress percentage',
      'Plan status: draft → active → completed / archived',
      'Creation, updates, approval, and history endpoints',
    ],
  },
  {
    id: 'progress',
    label: 'Progress',
    title: 'Tracking & dashboards',
    body: 'Progress updates and dashboard-oriented analytics for operational review.',
    detail: [
      'Therapist dashboard and admin overview patterns',
      'Goal tracking and session-oriented statistics',
    ],
  },
  {
    id: 'access',
    label: 'Access',
    title: 'Auth & RBAC',
    body: 'JWT authentication with role-aware access for operational screens.',
    detail: [
      'Roles: therapist, admin, caregiver, patient',
      'Protected routes and role middleware on the API',
    ],
  },
]
