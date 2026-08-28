'use client'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import {
  PROFESSIONAL, CV, GITHUB, LINKEDIN, CONTACT, ZONES, type Zone,
} from './world-data'
import { Hall } from './world-hall-mesh'
import { CameraController } from './world-opening'
import { AutiSmartPanel } from './autismart-panel'
import type { StageId } from './autismart-data'
import { ClinicOSPanel } from './clinicos-panel'
import type { ClinicStageId } from './clinicos-data'
import { SchoolIEPPanel } from './schooliep-panel'
import type { IepStageId } from './schooliep-data'
import './world-hall.css'

function ZonePanel({
  zone,
  onClose,
}: {
  zone: Zone
  onClose: () => void
}) {
  return (
    <aside className="zone-panel" role="dialog" aria-labelledby="zone-title">
      <div className="zone-panel-inner">
        <header className="zone-panel-head">
          <p className="zone-kicker">{zone.kicker}</p>
          <h2 id="zone-title">{zone.title}</h2>
          <button type="button" className="zone-close" onClick={onClose} aria-label="Close zone">
            Close
          </button>
        </header>
        <p className="zone-body">{zone.body}</p>
        <ul className="zone-points">
          {zone.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="zone-links">
          {zone.links.map((l) => (
            <a key={l.href + l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}

function MobileStage({
  entered,
  onEnter,
  focus,
  setFocus,
  stageId,
  setStageId,
  clinicStageId,
  setClinicStageId,
  iepStageId,
  setIepStageId,
}: {
  entered: boolean
  onEnter: () => void
  focus: string | null
  setFocus: (id: string | null) => void
  stageId: StageId | null
  setStageId: (id: StageId | null) => void
  clinicStageId: ClinicStageId | null
  setClinicStageId: (id: ClinicStageId | null) => void
  iepStageId: IepStageId | null
  setIepStageId: (id: IepStageId | null) => void
}) {
  const activeZone = focus ? ZONES.find((z) => z.id === focus) ?? null : null

  return (
    <div className="mobile-stage">
      <div className={`mobile-hall ${entered ? 'is-entered' : ''}`}>
        <div className="mobile-lamp" />
        <div className="mobile-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mobile-object">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        {entered && !activeZone && (
          <div className="mobile-zones">
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                className={focus === z.id ? 'active' : ''}
                onClick={() => setFocus(z.id)}
              >
                {z.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {!entered && (
        <div className="mobile-landing">
          <p className="kicker">DIGITAL WORKSPACE</p>
          <h1>Syed Muhammad Ali Naqvi</h1>
          <p className="tagline">I BUILD. I TEACH. I LEARN. I PRESERVE.</p>
          <div className="actions">
            <button type="button" onClick={onEnter}>
              Enter the world
            </button>
            <a href={PROFESSIONAL} target="_blank" rel="noopener noreferrer">
              Professional portfolio
            </a>
          </div>
        </div>
      )}
      {entered && activeZone && (
        <div className="mobile-panel">
          {activeZone.id === 'ai' ? (
            <AutiSmartPanel
              onClose={() => { setFocus(null); setStageId(null) }}
              stageId={stageId}
              setStageId={setStageId}
            />
          ) : activeZone.id === 'engineering' ? (
            <ClinicOSPanel
              onClose={() => { setFocus(null); setClinicStageId(null) }}
              stageId={clinicStageId}
              setStageId={setClinicStageId}
            />
          ) : activeZone.id === 'academy' ? (
            <SchoolIEPPanel
              onClose={() => { setFocus(null); setIepStageId(null) }}
              stageId={iepStageId}
              setStageId={setIepStageId}
            />
          ) : (
            <ZonePanel zone={activeZone} onClose={() => setFocus(null)} />
          )}
        </div>
      )}
    </div>
  )
}

export function WorldHall() {
  const [entered, setEntered] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)
  const [stageId, setStageId] = useState<StageId | null>(null)
  const [clinicStageId, setClinicStageId] = useState<ClinicStageId | null>(null)
  const [iepStageId, setIepStageId] = useState<IepStageId | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    const t = setTimeout(() => setReady(true), 500)
    return () => {
      mq.removeEventListener('change', update)
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (!entered) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setFocus(null); setStageId(null); setClinicStageId(null); setIepStageId(null) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [entered])

  const focusAngle = focus ? ZONES.find((z) => z.id === focus)?.angle ?? null : null
  const activeZone = focus ? ZONES.find((z) => z.id === focus) ?? null : null

  return (
    <main className="world-hall">
      <header className="world-bar">
        <a className="brand" href="#">
          SA
        </a>
        <nav className="recruiter-links" aria-label="Professional links">
          <a href={PROFESSIONAL} target="_blank" rel="noopener noreferrer">
            Professional Portfolio
          </a>
          <a href={CV} target="_blank" rel="noopener noreferrer">
            CV
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={CONTACT}>Contact</a>
        </nav>
      </header>

      {isMobile ? (
        <MobileStage
          entered={entered}
          onEnter={() => setEntered(true)}
          focus={focus}
          setFocus={setFocus}
          stageId={stageId}
          setStageId={setStageId}
          clinicStageId={clinicStageId}
          setClinicStageId={setClinicStageId}
          iepStageId={iepStageId}
          setIepStageId={setIepStageId}
        />
      ) : (
        <>
          <div className="canvas-wrap">
            <Canvas
              camera={{ position: [0, 3.4, 12.5], fov: 38 }}
              dpr={[1, 1.4]}
              gl={{ antialias: true, powerPreference: 'high-performance' }}
              shadows
            >
              <color attach="background" args={['#080a10']} />
              <fog attach="fog" args={['#080a10', 10, 22]} />
              <Hall focusId={focus} stageId={stageId} clinicStageId={clinicStageId} iepStageId={iepStageId} />
              <CameraController entered={entered} focusAngle={focusAngle} />
            </Canvas>
          </div>

          <div className="world-ui">
            {!entered ? (
              <section className={`landing ${ready ? 'is-ready' : ''}`}>
                <p className="kicker">DIGITAL WORKSPACE</p>
                <h1>Syed Muhammad Ali Naqvi</h1>
                <p className="tagline">I BUILD. I TEACH. I LEARN. I PRESERVE.</p>
                <div className="actions">
                  <button
                    type="button"
                    disabled={!ready}
                    onClick={() => setEntered(true)}
                  >
                    {ready ? 'Enter the world' : '…'}
                  </button>
                  <a href={PROFESSIONAL} target="_blank" rel="noopener noreferrer">
                    Professional portfolio
                  </a>
                </div>
              </section>
            ) : (
              <>
                <nav className="zone-nav" aria-label="World zones">
                  {ZONES.map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      className={focus === z.id ? 'active' : ''}
                      onClick={() => setFocus(focus === z.id ? null : z.id)}
                    >
                      {z.label}
                    </button>
                  ))}
                </nav>
                {activeZone && activeZone.id === 'ai' ? (
                  <AutiSmartPanel
                    onClose={() => { setFocus(null); setStageId(null) }}
                    stageId={stageId}
                    setStageId={setStageId}
                  />
                ) : activeZone && activeZone.id === 'engineering' ? (
                  <ClinicOSPanel
                    onClose={() => { setFocus(null); setClinicStageId(null) }}
                    stageId={clinicStageId}
                    setStageId={setClinicStageId}
                  />
                ) : activeZone && activeZone.id === 'academy' ? (
                  <SchoolIEPPanel
                    onClose={() => { setFocus(null); setIepStageId(null) }}
                    stageId={iepStageId}
                    setStageId={setIepStageId}
                  />
                ) : activeZone ? (
                  <ZonePanel zone={activeZone} onClose={() => setFocus(null)} />
                ) : (
                  <p className="hint">Select a zone · camera glances toward the opening</p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </main>
  )
}
