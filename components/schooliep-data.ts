/** Verified SchoolIEP content from public repo README + case study. */

export const SCHOOLIEP = {
  title: 'SchoolIEP',
  kicker: 'EDUCATION · IEP LIFECYCLE · GOALS · PROGRESS',
  subtitle:
    'Platform for student records, individualized education plans, goals, parent coordination, and progress reporting',
  framing:
    'Portfolio / academic project demonstrating full-stack engineering and education-domain workflow design. Not a certified educational, medical, or institutional records system.',
  contribution: {
    framing:
      'Presented as an individual portfolio / academic software project. Public codebase reflects full-stack work across domain modelling, API modules, auth, and dashboard UI.',
    role: 'Full-stack implementation across data model, REST modules, auth, and education workflows',
    bullets: [
      'Domain data modelling — Student, Parent, IEP, Goal, ProgressReport',
      'REST API modules for students, parents, IEPs, goals, and progress',
      'JWT Bearer authentication middleware for protected workflows',
      'React dashboard screens for IEP, students, goals, and progress reports',
      'Setup guides and project documentation',
    ],
  },
  stack: [
    'React',
    'Vite',
    'Node.js',
    'Express',
    'MongoDB',
    'Mongoose',
    'JWT',
  ],
  disclaimer:
    'Academic software project. Not a certified education records system and not evidence of institutional deployment or educational outcomes.',
  links: {
    caseStudy:
      'https://alishah1029384756.github.io/AliShah1029384756/projects/schooliep.html',
    repo: 'https://github.com/AliShah1029384756/SchoolIEP',
  },
} as const

export type IepStageId =
  | 'student'
  | 'iep'
  | 'goals'
  | 'collab'
  | 'progress'

export type IepStage = {
  id: IepStageId
  label: string
  title: string
  body: string
  detail: string[]
}

/** Planning concepts supported by public documentation only. */
export const IEP_STAGES: IepStage[] = [
  {
    id: 'student',
    label: 'Student',
    title: 'Student records',
    body: 'Student profile and record management as the anchor for IEP workflows.',
    detail: [
      'Student management via dedicated REST module',
      'Profiles linked into the broader education workflow',
    ],
  },
  {
    id: 'iep',
    label: 'IEP',
    title: 'IEP lifecycle',
    body: 'Individualized education plan management from draft through active tracking.',
    detail: [
      'IEP lifecycle management endpoints and models',
      'IEP as the central plan document referenced by goals and reports',
    ],
  },
  {
    id: 'goals',
    label: 'Goals',
    title: 'Learning goals',
    body: 'Individual learning goal creation and progress tracking linked to an IEP.',
    detail: [
      'Separate Goal collection with ObjectId reference to IEP',
      'Goals kept independent from period reports for different lifecycles',
    ],
  },
  {
    id: 'collab',
    label: 'Parents',
    title: 'Parent coordination',
    body: 'Parent profile management and coordination alongside student records.',
    detail: [
      'Parent management module with relationship to students',
      'Supports structured coordination in the education workflow',
    ],
  },
  {
    id: 'progress',
    label: 'Progress',
    title: 'Progress reporting',
    body: 'Period-based progress reports linked to an IEP (semester / year style periods).',
    detail: [
      'ProgressReport model with overall progress, summary, observations',
      'Linked to IEP via ObjectId reference',
    ],
  },
]
