import React from 'react'

export default function JokerSelector({ options, onSelect, round }) {
  return (
    <div className="joker-overlay">
      <div className="joker-modal">
        <div className="joker-modal__header">
          <h2 className="joker-modal__title glow-gold">¡Ronda {round} completada!</h2>
          <p className="joker-modal__subtitle">Elige un Joker para potenciar tu próxima ronda</p>
        </div>

        <div className="joker-modal__options">
          {options.map(joker => (
            <button
              key={joker.id}
              className="joker-option"
              style={{ '--joker-color': joker.color }}
              onClick={() => onSelect(joker.id)}
            >
              <span className="joker-option__emoji">{joker.emoji}</span>
              <div className="joker-option__info">
                <span className="joker-option__name">{joker.name}</span>
                <span className="joker-option__rarity">{joker.rarity}</span>
                <p className="joker-option__desc">{joker.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .joker-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.25s ease;
        }
        .joker-modal {
          background: linear-gradient(160deg, #1a1228, #110d18);
          border: 1px solid rgba(240,192,64,0.35);
          border-radius: 16px;
          padding: 32px 28px;
          max-width: 480px; width: 92%;
          box-shadow: 0 0 60px rgba(240,192,64,0.15), 0 24px 60px rgba(0,0,0,0.7);
        }
        .joker-modal__header { text-align: center; margin-bottom: 24px; }
        .joker-modal__title {
          font-family: var(--font-display);
          font-size: 1.4rem; color: var(--accent-gold); margin-bottom: 6px;
        }
        .joker-modal__subtitle { font-size: 0.9rem; color: var(--text-muted); }
        .joker-modal__options { display: flex; flex-direction: column; gap: 12px; }
        .joker-option {
          display: flex; align-items: center; gap: 16px;
          background: color-mix(in srgb, var(--joker-color) 10%, var(--bg-panel));
          border: 1px solid color-mix(in srgb, var(--joker-color) 50%, transparent);
          border-radius: 12px; padding: 16px 18px;
          cursor: pointer; transition: all 0.18s ease;
          text-align: left; animation: fadeIn 0.3s ease backwards;
        }
        .joker-option:hover {
          background: color-mix(in srgb, var(--joker-color) 22%, var(--bg-panel));
          transform: translateX(4px);
          box-shadow: 0 0 20px color-mix(in srgb, var(--joker-color) 30%, transparent);
        }
        .joker-option__emoji {
          font-size: 2.2rem; flex-shrink: 0;
          animation: float 2.5s ease-in-out infinite;
        }
        .joker-option__info { display: flex; flex-direction: column; gap: 2px; }
        .joker-option__name {
          font-family: var(--font-heading); font-size: 0.95rem;
          color: var(--text-primary); font-weight: 600;
        }
        .joker-option__rarity {
          font-size: 0.7rem; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--joker-color);
        }
        .joker-option__desc {
          font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin-top: 2px;
        }
      `}</style>
    </div>
  )
}