import React from 'react'

export default function ScoreDisplay({ score, target, round, deckLeft, lives, handResult }) {
  const pct = target > 0 ? Math.min(100, (score / target) * 100) : 0

  return (
    <div className="score-display">
      <div className="score-display__header">
        <span className="score-display__round">Ronda {round}</span>
        <span className="score-display__lives">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i}>{i < lives ? '♥' : '♡'}</span>
          ))}
        </span>
      </div>

      <div className="score-display__scores">
        <div className="score-display__block">
          <span className="score-display__label">Puntaje</span>
          <span className="score-display__value score-display__value--score">{score.toLocaleString()}</span>
        </div>
        <div className="score-display__divider">vs</div>
        <div className="score-display__block">
          <span className="score-display__label">Objetivo</span>
          <span className="score-display__value">{target.toLocaleString()}</span>
        </div>
      </div>

      <div className="score-display__bar-track">
        <div
          className="score-display__bar-fill"
          style={{ width: `${pct}%`, background: pct >= 100 ? '#008000' : '#316AC5' }}
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
          background: #ECE9D8;
          border: 2px groove #ACA899;
          padding: 8px 10px;
          display: flex; flex-direction: column; gap: 7px;
          box-shadow: 1px 1px 3px rgba(0,0,0,0.25);
          font-family: 'Tahoma', Arial, sans-serif;
        }
        .score-display__header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .score-display__round {
          font-size: 11px; font-weight: bold; color: #000;
        }
        .score-display__lives {
          font-size: 12px; color: #CC0000; letter-spacing: 2px;
        }
        .score-display__scores {
          display: flex; align-items: center; gap: 6px;
        }
        .score-display__block {
          display: flex; flex-direction: column; align-items: center; flex: 1;
        }
        .score-display__label {
          font-size: 9px; text-transform: uppercase;
          letter-spacing: 0.05em; color: #666;
        }
        .score-display__value {
          font-size: 16px; font-weight: bold; color: #000;
        }
        .score-display__value--score { color: #003399; }
        .score-display__divider { color: #888; font-size: 10px; }
        .score-display__bar-track {
          height: 8px;
          background: #FFFFFF;
          border: 1px inset #ACA899;
          border-radius: 1px; overflow: hidden;
        }
        .score-display__bar-fill {
          height: 100%;
          transition: width 0.35s ease;
        }
        .score-display__hand-name {
          font-size: 11px; font-weight: bold;
          color: #000; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 1px;
          border-top: 1px solid #ACA899; padding-top: 5px;
        }
        .score-display__hand-chips {
          font-size: 9px; color: #555; font-weight: normal;
        }
        .score-display__deck {
          font-size: 10px; color: #555; text-align: center;
        }
      `}</style>
    </div>
  )
}
