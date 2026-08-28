'use client'

import { useState } from 'react'
import { SCHOOLIEP, IEP_STAGES, type IepStageId } from './schooliep-data'

type Props = {
  onClose: () => void
  stageId: IepStageId | null
  setStageId: (id: IepStageId | null) => void
}

export function SchoolIEPPanel({ onClose, stageId, setStageId }: Props) {
  const [tab, setTab] = useState<'flow' | 'role' | 'stack'>('flow')
  const stage = stageId ? IEP_STAGES.find((s) => s.id === stageId) ?? null : null

  return (
    <aside className="zone-panel schooliep-panel" role="dialog" aria-labelledby="si-title">
      <div className="zone-panel-inner">
        <header className="zone-panel-head">
          <p className="zone-kicker">{SCHOOLIEP.kicker}</p>
          <h2 id="si-title">{SCHOOLIEP.title}</h2>
          <p className="as-sub">{SCHOOLIEP.subtitle}</p>
          <button type="button" className="zone-close" onClick={onClose} aria-label="Close SchoolIEP">
            Close
          </button>
        </header>

        <p className="as-meta">{SCHOOLIEP.framing}</p>

        <div className="as-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'flow'} className={tab === 'flow' ? 'active' : ''} onClick={() => setTab('flow')}>
            Planning
          </button>
          <button type="button" role="tab" aria-selected={tab === 'role'} className={tab === 'role' ? 'active' : ''} onClick={() => setTab('role')}>
            Contribution
          </button>
          <button type="button" role="tab" aria-selected={tab === 'stack'} className={tab === 'stack' ? 'active' : ''} onClick={() => setTab('stack')}>
            Stack & limits
          </button>
        </div>

        {tab === 'flow' && (
          <div className="as-flow">
            <p className="zone-body">
              Inspect planning concepts from the verified system. Exploration is optional — case study and repository stay one click away.
            </p>
            <div className="as-stages" role="list">
              {IEP_STAGES.map((s) => (
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
            <p className="as-team-note">{SCHOOLIEP.contribution.framing}</p>
            <h3>Documented scope of work</h3>
            <p className="as-role-title">{SCHOOLIEP.contribution.role}</p>
            <ul className="zone-points">
              {SCHOOLIEP.contribution.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'stack' && (
          <div className="as-stack">
            <h3>Technology</h3>
            <div className="as-chips">
              {SCHOOLIEP.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <h3>Architecture</h3>
            <p className="zone-body">
              Monolithic full-stack: React UI → Express REST API → MongoDB. Separate Goal and ProgressReport collections reference an IEP. JWT Bearer middleware protects workflows (auth present/absent — not multi-role RBAC like ClinicOS).
            </p>
            <p className="as-disclaimer">{SCHOOLIEP.disclaimer}</p>
          </div>
        )}

        <div className="zone-links as-links">
          <a href={SCHOOLIEP.links.caseStudy} target="_blank" rel="noopener noreferrer">
            Full case study
          </a>
          <a href={SCHOOLIEP.links.repo} target="_blank" rel="noopener noreferrer">
            Repository
          </a>
        </div>
      </div>
    </aside>
  )
}
