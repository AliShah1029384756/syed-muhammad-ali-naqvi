'use client'

import { useState } from 'react'
import {
  AUTISMART,
  STAGES,
  type StageId,
} from './autismart-data'

type Props = {
  onClose: () => void
  stageId: StageId | null
  setStageId: (id: StageId | null) => void
}

export function AutiSmartPanel({ onClose, stageId, setStageId }: Props) {
  const [tab, setTab] = useState<'flow' | 'role' | 'stack'>('flow')
  const stage = stageId ? STAGES.find((s) => s.id === stageId) ?? null : null

  return (
    <aside className="zone-panel autismart-panel" role="dialog" aria-labelledby="as-title">
      <div className="zone-panel-inner">
        <header className="zone-panel-head">
          <p className="zone-kicker">{AUTISMART.kicker}</p>
          <h2 id="as-title">{AUTISMART.title}</h2>
          <p className="as-sub">{AUTISMART.subtitle}</p>
          <button type="button" className="zone-close" onClick={onClose} aria-label="Close AutiSmart">
            Close
          </button>
        </header>

        <p className="as-meta">
          {AUTISMART.institution} · {AUTISMART.period} · {AUTISMART.grades}
        </p>

        <div className="as-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'flow'}
            className={tab === 'flow' ? 'active' : ''}
            onClick={() => setTab('flow')}
          >
            System flow
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
              Select a stage to inspect the verified architecture. Exploration is optional —
              full case study stays one click away.
            </p>
            <div className="as-stages" role="list">
              {STAGES.map((s) => (
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
            <p className="as-team-note">
              Team Final Year Project. Individual ownership of every line of code is not
              claimed.
            </p>
            <h3>My contribution</h3>
            <p className="as-role-title">{AUTISMART.contribution.role}</p>
            <ul className="zone-points">
              {AUTISMART.contribution.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <h3>Teammates</h3>
            <ul className="as-teammates">
              {AUTISMART.teammates.map((t) => (
                <li key={t.name}>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'stack' && (
          <div className="as-stack">
            <h3>Technology</h3>
            <div className="as-chips">
              {AUTISMART.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <h3>Architecture</h3>
            <p className="zone-body">
              Classic monolithic full-stack: React UI → Express REST API → MongoDB, with Groq
              for AI assist and Nodemailer for OTP. No microservices claimed.
            </p>
            <p className="as-disclaimer">{AUTISMART.disclaimer}</p>
          </div>
        )}

        <div className="zone-links as-links">
          <a href={AUTISMART.links.caseStudy} target="_blank" rel="noopener noreferrer">
            Full case study
          </a>
          <a href={AUTISMART.links.repo} target="_blank" rel="noopener noreferrer">
            FYP repository
          </a>
          <a href={AUTISMART.links.demo} target="_blank" rel="noopener noreferrer">
            Live demo
          </a>
        </div>
      </div>
    </aside>
  )
}
