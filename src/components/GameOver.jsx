import React from 'react'

export default function GameOver({ round, totalScore, highScore, onRestart, onMenu }) {
  const isRecord = totalScore >= highScore && totalScore > 0

  return (
    <div className="gameover-overlay">
      <div className="gameover-modal">
        <div className="gameover-modal__icon">💀</div>
        <h2 className="gameover-modal__title glow-red">Game Over</h2>
        <p className="gameover-modal__sub">Llegaste hasta la ronda {round}</p>

        <div className="gameover-modal__stats">
          <div className="gameover-stat">
            <span className="gameover-stat__label">Puntaje total</span>
            <span className="gameover-stat__value glow-gold">{totalScore.toLocaleString()}</span>
          </div>
          <div className="gameover-stat">
            <span className="gameover-stat__label">Mejor puntaje</span>
            <span className="gameover-stat__value">{highScore.toLocaleString()}</span>
          </div>
          {isRecord && (
            <div className="gameover-modal__record">🎉 ¡Nuevo récord!</div>
          )}
        </div>

        <div className="gameover-modal__buttons">
          <button className="btn btn-primary" onClick={onRestart}>
            🔄 Jugar de nuevo
          </button>
          <button className="btn btn-secondary" onClick={onMenu}>
            🏠 Menú principal
          </button>
        </div>
      </div>

      <style>{`
        .gameover-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.88);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; animation: fadeIn 0.3s ease;
        }
        .gameover-modal {
          background: linear-gradient(160deg, #1a0e0e, #110a10);
          border: 1px solid rgba(230,57,70,0.35);
          border-radius: 20px; padding: 40px 32px;
          max-width: 400px; width: 92%; text-align: center;
          box-shadow: 0 0 60px rgba(230,57,70,0.12), 0 24px 60px rgba(0,0,0,0.7);
        }
        .gameover-modal__icon {
          font-size: 3.5rem;
          animation: float 2s ease-in-out infinite;
          margin-bottom: 8px;
        }
        .gameover-modal__title {
          font-family: var(--font-display);
          font-size: 2rem; font-weight: 900; margin-bottom: 8px;
        }
        .gameover-modal__sub {
          font-size: 0.9rem; color: var(--text-muted); margin-bottom: 24px;
        }
        .gameover-modal__stats {
          display: flex; flex-direction: column;
          gap: 12px; margin-bottom: 28px;
        }
        .gameover-stat {
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(255,255,255,0.04);
          border-radius: 8px; padding: 10px 16px;
        }
        .gameover-stat__label {
          font-size: 0.8rem; color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .gameover-stat__value {
          font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700;
        }
        .gameover-modal__record {
          font-size: 0.9rem; color: var(--accent-gold);
          font-family: var(--font-heading);
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        .gameover-modal__buttons {
          display: flex; flex-direction: column; gap: 10px;
        }
      `}</style>
    </div>
  )
}