import React from 'react'

export default function ScoreDisplay({ score, target, round, deckLeft, lives, handResult }) {
  const pct = target > 0 ? Math.min(100, (score / target) * 100) : 0

  return (
    <div className="score-display">
      <div className="score-display__header">
        <span className="score-display__round">Ronda {round}</span>
        <span className="score-display__lives">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i}>{i < lives ? '❤️' : '🖤'}</span>
          ))}
        </span>
      </div>

      <div className="score-display__scores">
        <div className="score-display__current">
          <span className="score-display__label">Puntaje</span>
          <span className="score-display__value glow-gold">{score.toLocaleString()}</span>
        </div>
        <div className="score-display__sep">vs</div>
        <div className="score-display__target">
          <span className="score-display__label">Objetivo</span>
          <span className="score-display__value">{target.toLocaleString()}</span>
        </div>
      </div>

      <div className="score-display__bar-track">
        <div
          className="score-display__bar-fill"
          style={{ width: `${pct}%`, background: pct >= 100 ? '#06d6a0' : '#f0c040' }}
        />
      </div>

      {handResult && (
        <div className="score-display__hand-name">
          {handResult.handInfo.name}
          <span className="score-display__hand-chips">
            {handResult.handInfo.chips}+chips × {handResult.handInfo.mult}x
          </span>
        </div>
      )}

      <div className="score-display__deck">🃏 {deckLeft} cartas restantes</div>

      <style>{`
        .score-display {
          background: rgba(26,18,32,0.95);
          border: 1px solid rgba(240,192,64,0.2);
          border-radius: 12px;
          padding: 14px 16px;
          display: flex; flex-direction: column; gap: 10px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .score-display__header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .score-display__round {
          font-family: var(--font-heading);
          font-size: 0.75rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--accent-gold);
        }
        .score-display__lives { font-size: 0.85rem; }
        .score-display__scores {
          display: flex; align-items: center; gap: 10px;
        }
        .score-display__current, .score-display__target {
          display: flex; flex-direction: column; align-items: center; flex: 1;
        }
        .score-display__label {
          font-size: 0.65rem; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--text-muted);
        }
        .score-display__value {
          font-family: var(--font-heading);
          font-size: 1.5rem; font-weight: 700;
        }
        .score-display__sep { color: var(--text-dim); font-size: 0.75rem; }
        .score-display__bar-track {
          height: 6px; background: rgba(255,255,255,0.08);
          border-radius: 3px; overflow: hidden;
        }
        .score-display__bar-fill {
          height: 100%; border-radius: 3px;
          transition: width 0.4s ease;
        }
        .score-display__hand-name {
          font-family: var(--font-heading); font-size: 0.75rem;
          color: var(--accent-gold); text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 2px;
        }
        .score-display__hand-chips {
          font-size: 0.7rem; color: var(--text-muted);
        }
        .score-display__deck {
          font-size: 0.75rem; color: var(--text-muted); text-align: center;
        }
      `}</style>
    </div>
  )
}