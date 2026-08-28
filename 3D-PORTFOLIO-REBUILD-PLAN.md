# Immersive 3D Portfolio — Rebuild Plan

## 1. Purpose

This repository will become Ali's immersive, experimental portfolio experience. The existing professional portfolio remains the primary recruiter-facing site and must not be replaced or modified by this project.

**Professional site:** clear, fast, recruiter-first proof.

**3D site:** memorable, exploratory, cinematic representation of how Ali builds, teaches, learns, and organizes knowledge.

The previous 3D experience is treated as a learning/reference baseline, not as the design to preserve. We will keep useful technical foundations where they reduce risk, but redesign the experience from the ground up.

## 2. Design North Star

**Feeling:** curiosity + intelligence + calm + ambition + craftsmanship.

The experience should feel like entering a carefully designed digital workspace, not a generic cyberpunk demo.

Avoid:
- rotating cubes/laptops used only for decoration
- excessive particles, neon, bloom, or RGB effects
- long walls of text inside the 3D canvas
- gimmicky interactions that slow down navigation
- copying the previous visual composition

Prefer:
- meaningful objects
- cinematic camera movement
- restrained lighting
- strong typography
- depth used to establish hierarchy
- short interactions with clear purpose
- HTML UI for important readable content

## 3. Core Experience

Opening scene:
- dark, atmospheric digital workspace
- slow camera reveal
- Ali's identity appears with minimal copy
- primary action: `ENTER THE WORLD`
- secondary action: `PROFESSIONAL PORTFOLIO`

Conceptual zones:
1. Engineering Lab — software systems and architecture
2. AI / Healthcare Lab — AutiSmart and responsible AI work
3. Academy — teaching, mentoring, and learning resources
4. Knowledge Archive — curated resources and documentation mindset
5. Journey — education, projects, teaching, and professional timeline
6. Career Terminal — CV, GitHub, LinkedIn, contact

The visitor can explore, but navigation must never require exploration. A visible navigation layer always provides a direct route.

## 4. Project Storytelling

### AutiSmart — flagship
Represent the system as an AI/healthcare workspace. Emphasize:
- team FYP status
- verified Full-Stack Development & AI Integration contribution
- multimodal/AI-assisted workflow where supported by project documentation
- architecture and system flow
- responsible medical disclaimer
- direct case-study link

### ClinicOS
Represent workflow/data relationships visually. Emphasize:
- full-stack architecture
- patients, sessions, treatment/workflow concepts where verified
- RBAC/JWT and technical decisions
- direct case-study link

### SchoolIEP
Represent education/IEP workflow visually. Emphasize:
- structured records
- goals/progress/role-aware workflows where verified
- full-stack architecture
- direct case-study link

Other work should appear as supporting depth, not compete with the three primary projects.

## 5. Journey

Use a restrained chronological path:
- BSCS / FAST-NUCES
- university systems and software work
- teaching and mentoring
- AutiSmart FYP
- BSCS graduation
- Atlas Honda Digital Marketing Internship
- current transition toward software engineering

No inflated claims or invented dates/metrics.

## 6. Content Rules

Use the current professional website and verified project repositories as the source of truth.

Never invent:
- users
- performance numbers
- production status
- clinical validation
- personal ownership of team features
- employment titles
- grades or metrics not already approved for this public experience

AutiSmart must remain explicitly a team project with contribution wording consistent with its public documentation.

## 7. Technical Direction

Current repository foundation already includes Next.js, React, TypeScript, Three.js, React Three Fiber, and Drei. Reuse only what is useful; redesign the experience and component structure rather than blindly extending the old UI.

Preferred principles:
- componentized scene architecture
- lazy-load heavy 3D sections/assets
- use instancing where appropriate
- cap device pixel ratio
- avoid unnecessary per-frame React state updates
- keep important content outside the WebGL canvas where practical
- progressive loading
- graceful error/fallback state
- mobile 2.5D/lightweight mode
- accessible HTML controls alongside canvas interactions

No paid asset is required for the first version. Prefer procedural geometry, CSS, SVG, and free/open-source assets.

## 8. Responsive Strategy

Desktop: full immersive 3D experience.

Tablet: reduced scene complexity and interaction density.

Mobile: lightweight 2.5D/interactive presentation with the same information architecture. Do not force desktop-scale 3D onto a small screen.

At every size, provide a direct `Professional Portfolio` route to the stable recruiter-facing site.

## 9. Build Phases

### Phase 0 — Foundation
- inspect existing code
- define routes and component boundaries
- define design tokens
- establish loading/error/fallback states
- preserve current deployment safety

### Phase 1 — World Prototype
- build one environment
- camera and lighting
- central identity object
- one interaction
- validate atmosphere before adding content

**Gate:** if the world does not feel compelling with minimal content, redesign before continuing.

### Phase 2 — Navigation + Zones
- direct navigation
- Engineering
- AI/Healthcare
- Academy
- Knowledge
- Journey
- Career

### Phase 3 — Project Evidence
- AutiSmart
- ClinicOS
- SchoolIEP
- supporting projects

### Phase 4 — Polish
- camera transitions
- restrained motion
- hover/focus states
- typography
- loading experience
- accessibility

### Phase 5 — Mobile + Performance
- mobile mode
- asset/code splitting
- DPR/performance tuning
- reduced-motion support
- keyboard/accessibility pass

### Phase 6 — Verification
- production build
- browser verification
- console/error check
- navigation/link check
- responsive checks
- performance sanity check
- final factual consistency audit

## 10. Success Criteria

The rebuild is successful only if:

1. A visitor understands who Ali is within ~10 seconds.
2. A recruiter can reach projects/CV/GitHub without exploring the 3D world.
3. AutiSmart is clearly the flagship.
4. Team vs personal contribution is never ambiguous.
5. The experience feels distinctive without looking gimmicky.
6. Mobile remains usable.
7. The site does not require paid 3D assets or services to function.
8. The existing professional website remains untouched and available.
9. Performance is treated as a first-class feature.
10. No unsupported professional, technical, healthcare, or impact claims are introduced.

## 11. Explicit Non-Goals

- Rebuilding the current professional website inside 3D.
- Making every piece of content a 3D object.
- Adding screenshots or walkthrough videos as a requirement.
- Chasing visual effects at the expense of usability.
- Repeated cosmetic polishing without measurable improvement.

## 12. Change Control

Before each major implementation phase, verify the phase against this document. If a proposed change is only cosmetic and does not improve storytelling, usability, credibility, or performance, skip it.

The project should evolve through deliberate milestones rather than ad-hoc edits.
