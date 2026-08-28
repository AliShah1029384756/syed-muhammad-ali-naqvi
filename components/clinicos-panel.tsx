'use client'

import { useState } from 'react'
import {
  CLINICOS,
  CLINIC_STAGES,
  type ClinicStageId,
} from './clinicos-data'

type Props = {
  onClose: () => void
  stageId: ClinicStageId | null
  setStageId: (id: ClinicStageId | null) => void
}

export function ClinicOSPanel({ onClose, stageId, setStageId }: Props) {
  const [tab, setTab] = useState<'flow' | 'role' | 'stack'>('flow')
  const stage = stageId ? CLINIC_STAGES.find((s) => s.id === stageId) ?? null : null

  return (
    <aside className="zone-panel clinicos-panel" role="dialog" aria-labelledby="co-title">
      <div className="zone-panel-inner">
        <header className="zone-panel-head">
          <p className="zone-kicker">{CLINICOS.kicker}</p>
          <h2 id="co-title">{CLINICOS.title}</h2>
          <p className="as-sub">{CLINICOS.subtitle}</p>
          <button type="button" className="zone-close" onClick={onClose} aria-label="Close ClinicOS">
            Close
          </button>
        </header>

        <p className="as-meta">{CLINICOS.framing}</p>

        <div className="as-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'flow'}
            className={tab === 'flow' ? 'active' : ''}
            onClick={() => setTab('flow')}
          >
            Operations
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'role'}
            className={tab === 'role' ? 'active' : ''}
            onClick={() => setTab('role')}
          >
            Contribution
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'stack'}
            className={tab === 'stack' ? 'active' : ''}
            onClick={() => setTab('stack')}
          >
            Stack & limits
          </button>
        </div>

        {tab === 'flow' && (
          <div className="as-flow">
            <p className="zone-body">
              Inspect operational layers of the system. Exploration is optional — case study and
              repository remain one click away.
            </p>
            <div className="as-stages" role="list">
              {CLINIC_STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="listitem"
                  className={stageId === s.id ? 'active' : ''}
                  onClick={() => setStageId(stageId === s.id ? null : s.id)}
                >
                  <span className="as-stage-label">{s.label}</span>
                  <span className="as-stage-title">{s.title}</span>
                </button>
              ))}
            </div>
            {stage && (
              <div className="as-stage-detail">
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
                <ul>
                  {stage.detail.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === 'role' && (
          <div className="as-role">
            <p className="as-team-note">{CLINICOS.contribution.framing}</p>
            <h3>Documented scope of work</h3>
            <p className="as-role-title">{CLINICOS.contribution.role}</p>
            <ul className="zone-points">
              {CLINICOS.contribution.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'stack' && (
          <div className="as-stack">
            <h3>Technology</h3>
            <div className="as-chips">
              {CLINICOS.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <h3>Roles in the system</h3>
            <div className="as-chips">
              {CLINICOS.roles.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
            <h3>Architecture</h3>
            <p className="zone-body">
              Monolithic full-stack: React UI → Express REST API → MongoDB. Session, treatment-plan,
              and therapist route modules. No external AI services claimed.
            </p>
            <p className="as-disclaimer">{CLINICOS.disclaimer}</p>
          </div>
        )}

        <div className="zone-links as-links">
          <a href={CLINICOS.links.caseStudy} target="_blank" rel="noopener noreferrer">
            Full case study
          </a>
          <a href={CLINICOS.links.repo} target="_blank" rel="noopener noreferrer">
            Repository
          </a>
        </div>
      </div>
    </aside>
  )
}
