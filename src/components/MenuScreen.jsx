import React, { useEffect, useState } from 'react'

const FLOATING_CARDS = ['♥', '♦', '♣', '♠']

export default function MenuScreen({ onStart, highScore }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      symbol: FLOATING_CARDS[i % 4],
      left: Math.random() * 90 + 5,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 4,
      size: 1 + Math.random() * 1.4,
      red: i % 4 < 2,
    }))
    setCards(generated)
  }, [])

  return (
    <div className="menu-screen">
      {cards.map(c => (
        <span
          key={c.id}
          className="menu-screen__bg-card"
          style={{
            left: `${c.left}%`,
            fontSize: `${c.size}rem`,
            color: c.red ? 'rgba(214,40,57,0.15)' : 'rgba(255,255,255,0.07)',
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.symbol}
        </span>
      ))}

      <div className="menu-screen__content">
        <div className="menu-screen__logo">
          <div className="menu-screen__logo-suits">
            <span style={{ color: '#d62839' }}>♥</span>
            <span style={{ color: '#d62839' }}>♦</span>
            <span>♣</span>
            <span>♠</span>
          </div>
          <h1 className="menu-screen__title glow-gold">BALATRO</h1>
          <p className="menu-screen__tagline">Web Edition</p>
        </div>

        <div className="menu-screen__sep" />

        {highScore > 0 && (
          <div className="menu-screen__highscore">
            <span className="menu-screen__hs-label">Mejor puntaje</span>
            <span className="menu-screen__hs-value glow-gold">{highScore.toLocaleString()}</span>
          </div>
        )}

        <div className="menu-screen__buttons">
          <button className="btn btn-primary" onClick={onStart}>
            🃏 Jugar
          </button>
        </div>

        <div className="menu-screen__how">
          <p>Selecciona cartas · Forma combinaciones · Supera el puntaje</p>
          <p>Elige Jokers · Sobrevive el mayor tiempo posible</p>
        </div>

        <div className="menu-screen__credit">
          UVG · Sistemas y Tecnologías Web · 2026
        </div>
      </div>

      <style>{`
        .menu-screen {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: radial-gradient(ellipse at 50% 40%, #1e0f2e 0%, #0a0608 70%);
          position: relative; overflow: hidden;
        }
        .menu-screen__bg-card {
          position: absolute; bottom: -10%;
          animation: floatUp linear infinite;
          pointer-events: none; user-select: none;
        }
        @keyframes floatUp {
          from { transform: translateY(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          to   { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        .menu-screen__content {
          display: flex; flex-direction: column; align-items: center; gap: 20px;
          z-index: 1; text-align: center; animation: fadeIn 0.6s ease;
        }
        .menu-screen__logo { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .menu-screen__logo-suits {
          display: flex; gap: 12px; font-size: 2rem;
          animation: float 3s ease-in-out infinite;
        }
        .menu-screen__title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900; color: var(--accent-gold);
          letter-spacing: 0.12em; line-height: 1;
        }
        .menu-screen__tagline {
          font-family: var(--font-heading); font-size: 0.85rem;
          letter-spacing: 0.3em; text-transform: uppercase; color: var(--text-muted);
        }
        .menu-screen__sep {
          width: 120px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
        }
        .menu-screen__highscore {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
        }
        .menu-screen__hs-label {
          font-size: 0.7rem; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--text-muted);
        }
        .menu-screen__hs-value {
          font-family: var(--font-heading); font-size: 1.6rem; color: var(--accent-gold);
        }
        .menu-screen__buttons .btn { font-size: 1rem; padding: 0.8rem 3rem; }
        .menu-screen__how {
          font-size: 0.8rem; color: var(--text-dim); line-height: 1.8;
        }
        .menu-screen__credit {
          font-size: 0.65rem; color: var(--text-dim); letter-spacing: 0.08em;
        }
      `}</style>
    </div>
  )
}