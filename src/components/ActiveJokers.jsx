import React, { useState } from 'react'
import { ALL_JOKERS } from '../data/jokers.js'

export default function ActiveJokers({ jokerIds }) {
  const [tooltip, setTooltip] = useState(null)

  const jokers = jokerIds
    .map(id => ALL_JOKERS.find(j => j.id === id))
    .filter(Boolean)

  if (jokers.length === 0) return (
    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', padding: '4px 2px', textShadow: '1px 1px 1px rgba(0,0,0,0.4)' }}>
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
        .active-jokers { display: flex; flex-direction: column; gap: 4px; }
        .active-jokers__label {
          font-size: 9px; text-transform: uppercase;
          letter-spacing: 0.05em; color: rgba(255,255,255,0.75);
          text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
          font-family: 'Tahoma', Arial, sans-serif;
        }
        .active-jokers__list { display: flex; flex-wrap: wrap; gap: 4px; }
        .joker-chip {
          width: 34px; height: 34px;
          background: linear-gradient(to bottom, #F0EDE2, #D9D5C8);
          border: 2px outset #DDDBD0;
          border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; cursor: pointer; position: relative;
        }
        .joker-chip:hover { background: linear-gradient(to bottom, #F7F4EC, #E4E0D4); }
        .joker-chip:active { border-style: inset; }
        .joker-chip__tooltip {
          position: absolute; bottom: calc(100% + 6px); left: 50%;
          transform: translateX(-50%);
          background: #FFFBE6;
          border: 1px solid #ACA899;
          border-radius: 2px; padding: 6px 8px;
          width: 150px; z-index: 100;
          box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
          pointer-events: none;
          font-family: 'Tahoma', Arial, sans-serif;
        }
        .joker-chip__tooltip strong {
          font-size: 10px; color: #000;
          display: block; margin-bottom: 3px;
        }
        .joker-chip__tooltip p {
          font-size: 9px; color: #333; line-height: 1.4;
        }
      `}</style>
    </div>
  )
}
