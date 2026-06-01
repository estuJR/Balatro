import React from 'react'

const suitStyles = {
  hearts:   { color: '#CC0000', symbol: '♥' },
  diamonds: { color: '#CC0000', symbol: '♦' },
  clubs:    { color: '#000000', symbol: '♣' },
  spades:   { color: '#000000', symbol: '♠' },
}

export default function Card({ card, selected, onClick, dealIndex = 0, disabled = false }) {
  const suit = suitStyles[card.suit] || { color: '#000000', symbol: '?' }

  return (
    <div
      className={`card ${selected ? 'card--selected' : ''} ${disabled ? 'card--disabled' : ''}`}
      onClick={() => !disabled && onClick && onClick(card)}
      style={{ animationDelay: `${dealIndex * 0.05}s` }}
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

      <style>{`
        .card {
          width: 72px; height: 100px;
          background: #FFFFFF;
          border: 1px solid #808080;
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          box-shadow: 2px 2px 4px rgba(0,0,0,0.30);
          transition: transform 0.12s ease;
          animation: card-deal 0.25s ease backwards;
          user-select: none;
          flex-shrink: 0;
        }
        .card:hover:not(.card--disabled) {
          transform: translateY(-10px);
          box-shadow: 3px 5px 8px rgba(0,0,0,0.35);
          z-index: 10;
        }
        .card--selected {
          transform: translateY(-16px) !important;
          border-color: #316AC5 !important;
          border-width: 2px !important;
          box-shadow: 2px 6px 10px rgba(0,0,0,0.4) !important;
          z-index: 20;
        }
        .card--disabled { cursor: default; opacity: 0.85; }
        .card__inner {
          width: 100%; height: 100%;
          padding: 4px 5px;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .card__corner {
          display: flex; flex-direction: column; align-items: center; line-height: 1;
        }
        .card__corner--br { align-self: flex-end; transform: rotate(180deg); }
        .card__rank {
          font-family: 'Tahoma', Arial, sans-serif;
          font-size: 0.9rem; font-weight: bold; line-height: 1;
        }
        .card__suit-sm { font-size: 0.7rem; line-height: 1; }
        .card__center {
          font-size: 1.9rem; text-align: center;
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          line-height: 1;
        }
      `}</style>
    </div>
  )
}
