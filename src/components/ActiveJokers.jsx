import React, { useState } from 'react'
import { ALL_JOKERS } from '../data/jokers.js'

export default function ActiveJokers({ jokerIds }) {
  const [tooltip, setTooltip] = useState(null)

  const jokers = jokerIds
    .map(id => ALL_JOKERS.find(j => j.id === id))
    .filter(Boolean)

  if (jokers.length === 0) return (
    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontStyle: 'italic', padding: '8px' }}>
      Sin jokers aún
    </div>
  )

  return (
    <div className="active-jokers">
      <span className="active-jokers__label">Jokers activos</span>
      <div className="active-jokers__list">
        {jokers.map(joker => (
          <div
            key={joker.id}
            className="joker-chip"
            style={{ '--joker-color': joker.color }}
            onMouseEnter={() => setTooltip(joker.id)}
            onMouseLeave={() => setTooltip(null)}
          >
            <span>{joker.emoji}</span>
            {tooltip === joker.id && (
              <div className="joker-chip__tooltip">
                <strong>{joker.name}</strong>
                <p>{joker.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .active-jokers { display: flex; flex-direction: column; gap: 6px; }
        .active-jokers__label {
          font-size: 0.65rem; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--text-muted);
        }
        .active-jokers__list { display: flex; flex-wrap: wrap; gap: 6px; }
        .joker-chip {
          width: 38px; height: 38px;
          background: color-mix(in srgb, var(--joker-color) 20%, var(--bg-panel));
          border: 1px solid var(--joker-color);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; cursor: pointer; position: relative;
          transition: transform 0.15s;
          box-shadow: 0 0 8px color-mix(in srgb, var(--joker-color) 40%, transparent);
        }
        .joker-chip:hover { transform: scale(1.15); }
        .joker-chip__tooltip {
          position: absolute; bottom: calc(100% + 8px); left: 50%;
          transform: translateX(-50%);
          background: var(--bg-panel);
          border: 1px solid var(--joker-color);
          border-radius: 8px; padding: 8px 10px;
          width: 160px; z-index: 100;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5);
          pointer-events: none;
        }
        .joker-chip__tooltip strong {
          font-family: var(--font-heading); font-size: 0.75rem;
          color: var(--accent-gold); display: block; margin-bottom: 4px;
        }
        .joker-chip__tooltip p {
          font-size: 0.72rem; color: var(--text-primary); line-height: 1.4;
        }
      `}</style>
    </div>
  )
}