import React from 'react'

const suitStyles = {
  hearts:   { color: '#d62839', symbol: '♥' },
  diamonds: { color: '#d62839', symbol: '♦' },
  clubs:    { color: '#1a1a2e', symbol: '♣' },
  spades:   { color: '#1a1a2e', symbol: '♠' },
}

export default function Card({ card, selected, onClick, dealIndex = 0, disabled = false }) {
  const suit = suitStyles[card.suit] || { color: '#000', symbol: '?' }

  return (
    <div
      className={`card ${selected ? 'card--selected' : ''} ${disabled ? 'card--disabled' : ''}`}
      onClick={() => !disabled && onClick && onClick(card)}
      style={{ animationDelay: `${dealIndex * 0.06}s` }}
    >
      <div className="card__inner">
        <div className="card__corner card__corner--tl" style={{ color: suit.color }}>
          <span className="card__rank">{card.rank}</span>
          <span className="card__suit-sm">{suit.symbol}</span>
        </div>
        <div className="card__center" style={{ color: suit.color }}>
          {suit.symbol}
        </div>
        <div className="card__corner card__corner--br" style={{ color: suit.color }}>
          <span className="card__rank">{card.rank}</span>
          <span className="card__suit-sm">{suit.symbol}</span>
        </div>
      </div>

      {selected && <div className="card__selected-indicator">✓</div>}

      <style>{`
        .card {
          width: 72px; height: 100px;
          background: linear-gradient(145deg, #fdfaf3, #ede8dc);
          border-radius: 8px;
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.8);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          animation: card-deal 0.35s ease backwards;
          user-select: none;
          flex-shrink: 0;
        }
        .card:hover:not(.card--disabled) {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 12px 28px rgba(0,0,0,0.6), 0 0 12px rgba(240,192,64,0.2);
          z-index: 10;
        }
        .card--selected {
          transform: translateY(-16px) scale(1.06) !important;
          box-shadow: 0 16px 36px rgba(0,0,0,0.7), 0 0 20px rgba(240,192,64,0.6) !important;
          z-index: 20;
          outline: 2px solid #f0c040;
        }
        .card--disabled { cursor: default; opacity: 0.8; }
        .card__inner {
          width: 100%; height: 100%;
          padding: 5px;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .card__corner {
          display: flex; flex-direction: column; align-items: center; line-height: 1;
        }
        .card__corner--br { align-self: flex-end; transform: rotate(180deg); }
        .card__rank { font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 700; }
        .card__suit-sm { font-size: 0.65rem; }
        .card__center {
          font-size: 1.8rem; text-align: center;
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }
        .card__selected-indicator {
          position: absolute; top: -8px; right: -8px;
          width: 18px; height: 18px;
          background: #f0c040; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; color: #1a0e00; font-weight: 900;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  )
}