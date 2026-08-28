# Immersive 3D Portfolio — Rebuild Plan v2

## Purpose

The immersive site is a **style-first creative portfolio experience**. The existing professional portfolio remains the recruiter-facing evidence site. This world exists to make Ali memorable and to demonstrate engineering craft through the experience itself.

## What was wrong with the previous direction

The old space/cyberpunk build was visually busy and template-like: neon accents, floating panels, particles, and decorative objects competed for attention. The first rebuild corrected that problem but became too empty: a dark rotunda, central stack, and empty openings did not create enough atmosphere or narrative.

**The target is neither cyberpunk nor an empty gallery.**

## Art Direction: DIGITAL ATELIER / KNOWLEDGE ARCHIVE

Feeling target:

**curiosity + intelligence + calm + ambition + craftsmanship**

Think of a private digital atelier where software systems, research notes, teaching material, and finished work are preserved as artifacts.

Visual language:
- deep charcoal / graphite architecture
- warm ivory / aged-brass accents
- restrained cool daylight from the upper structure
- stone, metal, glass and paper-like surfaces
- strong light falloff and depth
- asymmetry inside a disciplined architectural shell
- quiet motion that makes the space feel alive

Avoid:
- neon cyberpunk
- RGB gradients
- particle/star fields
- floating UI-card soup
- decorative laptops/cubes
- fake futuristic HUDs
- excessive bloom
- generic sci-fi portals

## Spatial Story

### Layer 1 — Arrival

The visitor enters a real-feeling architectural space, not a UI container.

The opening must communicate:
- Ali's name
- Full-Stack Software Engineer · Healthcare & EdTech
- manifesto
- Enter the world
- Professional portfolio escape hatch

### Layer 2 — The Atelier

The central space contains a meaningful **knowledge/craft axis** plus environmental details that imply a working archive:
- tiered central plinth
- six preserved archive plates
- peripheral shelves / vertical archive ribs
- ceiling oculus / hanging light structure
- floor inlays and material transitions
- subtle animated light and mechanical movement

These elements exist to establish atmosphere, not to display random information.

### Layer 3 — Six Doors

Six architectural openings form the navigation system:

1. Engineering — ClinicOS
2. AI / Healthcare — AutiSmart
3. Academy — SchoolIEP
4. Knowledge — learning/documentation ecosystem
5. Journey — education → projects → teaching → internship
6. Career — CV / GitHub / LinkedIn / contact

The visitor can click the zone bar directly; exploration is optional.

### Layer 4 — Work Comes Alive

The three flagship projects get distinct spatial metaphors:
- **AutiSmart:** connected assessment → AI → therapy-support pipeline
- **ClinicOS:** operations/workflow desk with access structure
- **SchoolIEP:** education planning board with student, goals, parent/collaboration structure

These must feel like artifacts/workspaces belonging to the same atelier, not three unrelated demos.

## Motion Direction

Motion should be slow, intentional and physical:
- subtle camera breathing
- slow light movement
- slight floating/settling of archive plates
- gentle active-door illumination
- project artifact reveal on focus
- cinematic camera glance, never a game-like spin

No constant object rotation unless it communicates function.

## Interaction Rules

- Recruiter links are always available.
- Enter is the primary arrival action.
- Zone navigation is always visible after entry.
- Escape closes active project/detail state.
- Important information remains HTML and keyboard accessible.
- 3D interaction is enhancement, never a requirement for understanding the portfolio.

## Responsive Strategy

Desktop: full atelier scene.

Tablet: reduced geometry and lighting density.

Mobile: intentionally designed 2.5D presentation with the same architecture/story hierarchy; do not shrink desktop WebGL into a tiny viewport.

## Technical Constraints

- Next.js + React + TypeScript + React Three Fiber + Three.js.
- Procedural geometry first.
- No paid assets or services required.
- Keep DPR capped.
- Avoid unnecessary per-frame React state.
- Prefer instancing/reusable materials where useful.
- Keep readable content in HTML.
- Preserve graceful fallback and reduced-motion behavior.

## Implementation Sequence

### V2-A — Art direction foundation
- strengthen materials and environmental depth
- build ceiling/atelier details
- enrich peripheral architecture
- improve arrival composition and typography

**Gate:** the empty hall must already feel like a designed place before adding more project content.

### V2-B — Spatial project storytelling
- keep AutiSmart / ClinicOS / SchoolIEP existing verified content
- improve their spatial reveal and relationship to their doors
- do not add unsupported project claims

### V2-C — Motion + polish
- camera choreography
- active-door transitions
- subtle environmental motion
- reduced-motion / keyboard / mobile pass

### V2-D — Production verification
- build/deploy check
- live interaction check
- console/error check
- responsive check
- factual consistency check

## Success Criteria

1. The first 10 seconds feel intentional and memorable.
2. The world feels authored even before a zone is opened.
3. The 3D layer adds emotional/spatial value rather than acting as decoration.
4. AutiSmart remains the flagship.
5. ClinicOS and SchoolIEP retain distinct visual identities.
6. Recruiters can bypass the world at any time.
7. No screenshots/video are required.
8. No paid 3D assets/services are required.
9. No unsupported professional, technical, medical or impact claims are introduced.
10. The professional portfolio remains untouched.

## Change Control

No new phase is opened for cosmetic tinkering. Every change must improve **storytelling, atmosphere, usability, credibility, or performance**. If it does not, skip it.
