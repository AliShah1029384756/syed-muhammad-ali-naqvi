'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

const PROFESSIONAL = 'https://alishah1029384756.github.io/AliShah1029384756/'
const CV =
  'https://alishah1029384756.github.io/AliShah1029384756/assets/Syed-Muhammad-Ali-Naqvi-Resume.pdf'
const GITHUB = 'https://github.com/AliShah1029384756'
const LINKEDIN = 'https://www.linkedin.com/in/ali-naqvi-1a9576331'
const CONTACT = 'mailto:shahyed99@gmail.com'
const PROJECTS = 'https://alishah1029384756.github.io/AliShah1029384756/projects.html'
const AUTISMART_CASE =
  'https://alishah1029384756.github.io/AliShah1029384756/projects.html#autismart'
const EDUCORE = 'https://alishah1029384756.github.io/educore-open-learning-hub/index.html'
const UNI_HUB =
  'https://github.com/AliShah1029384756/university-course-projects-hub'

type ZoneId =
  | 'engineering'
  | 'ai'
  | 'academy'
  | 'knowledge'
  | 'journey'
  | 'career'

type Zone = {
  id: ZoneId
  label: string
  angle: number
  title: string
  kicker: string
  body: string
  points: string[]
  links: { label: string; href: string }[]
}

const ZONES: Zone[] = [
  {
    id: 'engineering',
    label: 'ENGINEERING',
    angle: 0,
    title: 'Engineering Lab',
    kicker: 'SYSTEMS · ARCHITECTURE · FULL-STACK',
    body: 'Practical full-stack systems: React, Node.js, Express, MongoDB, REST APIs, authentication, and structured product workflows. Breadth comes from university systems work and public case studies.',
    points: [
      'ClinicOS — healthcare workflow application (patients, sessions, plans, JWT + RBAC)',
      'SchoolIEP — education IEP lifecycle, goals, progress, parent coordination',
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
    kicker: 'TEACH · MENTOR · STRUCTURE',
    body: 'CS educator and mentor alongside the degree. Structured guidance for programming fundamentals, project planning, and university coursework — not a formal teaching title, but consistent public mentoring and resource building.',
    points: [
      '3+ years supporting students in CS and technical projects',
      '20+ students mentored (public claim on professional site)',
      'Learning hubs and project-planning resources for peers',
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

function CameraController({
  entered,
  focusAngle,
}: {
  entered: boolean
  focusAngle: number | null
}) {
  const { camera } = useThree()
  const start = useRef({ x: 0, y: 3.85, z: 13.6 })
  const goal = useRef({ x: 0, y: 1.55, z: 6.8 })
  const look = useRef({ x: 0, y: 0.72, z: 0 })

  useFrame((_, delta) => {
    const t = Math.min(delta * 1.2, 1)
    if (!entered) {
      camera.position.x += (start.current.x - camera.position.x) * t * 0.48
      camera.position.y += (start.current.y - camera.position.y) * t * 0.48
      camera.position.z += (start.current.z - camera.position.z) * t * 0.48
      look.current.y += (0.72 - look.current.y) * t * 0.45
      camera.lookAt(0, look.current.y, 0)
      return
    }

    let targetX = 0
    let targetY = 1.35
    let targetZ = 4.85
    let lookX = 0
    let lookY = 0.78

    if (focusAngle !== null) {
      targetX = Math.sin(focusAngle) * 2.25
      targetZ = 4.9 - Math.cos(focusAngle) * 1.15
      targetY = 1.2
      lookX = Math.sin(focusAngle) * 0.65
      lookY = 0.9
    }

    goal.current.x += (targetX - goal.current.x) * t
    goal.current.y += (targetY - goal.current.y) * t
    goal.current.z += (targetZ - goal.current.z) * t
    look.current.x += (lookX - look.current.x) * t
    look.current.y += (lookY - look.current.y) * t

    camera.position.x += (goal.current.x - camera.position.x) * t
    camera.position.y += (goal.current.y - camera.position.y) * t
    camera.position.z += (goal.current.z - camera.position.z) * t
    camera.lookAt(look.current.x, look.current.y, 0)
  })

  return null
}
