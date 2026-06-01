import React from 'react'

export default function MenuScreen({ onStart, highScore }) {
  return (
    <div className="menu-screen">
      <div className="menu-screen__window">
        <div className="menu-screen__titlebar">
          <span className="menu-screen__titlebar-icon">🃏</span>
          <span className="menu-screen__titlebar-text">Balatro</span>
          <div className="menu-screen__titlebar-btns">
            <span className="xp-btn xp-btn--min">_</span>
            <span className="xp-btn xp-btn--max">□</span>
            <span className="xp-btn xp-btn--close">✕</span>
          </div>
        </div>

        <div className="menu-screen__body">
          <div className="menu-screen__suits">
            <span style={{ color: '#CC0000' }}>♥</span>
            <span style={{ color: '#000000' }}>♠</span>
            <span style={{ color: '#CC0000' }}>♦</span>
            <span style={{ color: '#000000' }}>♣</span>
          </div>

          <h1 className="menu-screen__title">BALATRO</h1>
          <p className="menu-screen__sub">Web Edition</p>

          <hr className="menu-screen__sep" />

          {highScore > 0 && (
            <div className="menu-screen__highscore">
              <span className="menu-screen__hs-label">Mejor puntaje:</span>
              <span className="menu-screen__hs-value">{highScore.toLocaleString()}</span>
            </div>
          )}

          <button className="btn btn-primary menu-screen__play-btn" onClick={onStart}>
            Jugar
          </button>

          <div className="menu-screen__how">
            <p>Selecciona cartas · Forma combinaciones · Supera el puntaje objetivo</p>
            <p>Elige Jokers entre rondas · Sobrevive el mayor tiempo posible</p>
          </div>

          <div className="menu-screen__credit">
            UVG · Sistemas y Tecnologías Web · 2026
          </div>
        </div>
      </div>

      <style>{`
        .menu-screen {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background:
            repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px),
            #35682E;
        }
        .menu-screen__window {
          background: #ECE9D8;
          border: 2px solid #0D3A96;
          box-shadow: 3px 3px 8px rgba(0,0,0,0.45), inset 1px 1px 0 #FFFFFF;
          width: 340px;
          border-radius: 4px 4px 2px 2px;
          overflow: hidden;
        }
        .menu-screen__titlebar {
          display: flex; align-items: center; gap: 6px;
          padding: 4px 6px;
          background: linear-gradient(to bottom, #4080D8 0%, #2060C8 50%, #1A54BE 100%);
          border-bottom: 1px solid #0D3A96;
          user-select: none;
        }
        .menu-screen__titlebar-icon { font-size: 13px; }
        .menu-screen__titlebar-text {
          flex: 1; font-family: 'Tahoma', Arial, sans-serif;
          font-size: 11px; font-weight: bold; color: #FFFFFF;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        .menu-screen__titlebar-btns { display: flex; gap: 2px; }
        .xp-btn {
          width: 16px; height: 14px; font-size: 9px; font-weight: bold;
          display: flex; align-items: center; justify-content: center;
          border: 1px outset #DDDBD0;
          border-radius: 2px;
          background: linear-gradient(to bottom, #F0EDE2, #D9D5C8);
          color: #000; cursor: default;
          line-height: 1;
        }
        .xp-btn--close { background: linear-gradient(to bottom, #E06040, #C04020); color: #FFF; }
        .menu-screen__body {
          padding: 24px 28px 20px;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          text-align: center;
        }
        .menu-screen__suits {
          display: flex; gap: 10px; font-size: 1.6rem;
        }
        .menu-screen__title {
          font-family: 'Tahoma', Arial, sans-serif;
          font-size: 2.2rem; font-weight: bold;
          color: #000000; letter-spacing: 0.08em;
          text-shadow: 1px 1px 0 #AAAAAA;
        }
        .menu-screen__sub {
          font-family: 'Tahoma', Arial, sans-serif;
          font-size: 10px; color: #666;
          letter-spacing: 0.15em; text-transform: uppercase;
          margin-top: -8px;
        }
        .menu-screen__sep {
          width: 100%; border: none;
          border-top: 1px solid #ACA899;
          border-bottom: 1px solid #FFFFFF;
        }
        .menu-screen__highscore {
          display: flex; gap: 8px; align-items: baseline;
          font-family: 'Tahoma', Arial, sans-serif;
        }
        .menu-screen__hs-label { font-size: 11px; color: #444; }
        .menu-screen__hs-value { font-size: 14px; font-weight: bold; color: #000; }
        .menu-screen__play-btn {
          width: 100px; font-size: 12px;
          padding: 5px 0; font-weight: bold;
        }
        .menu-screen__how {
          font-size: 10px; color: #555; line-height: 1.7;
          font-family: 'Tahoma', Arial, sans-serif;
        }
        .menu-screen__credit {
          font-size: 9px; color: #888;
          font-family: 'Tahoma', Arial, sans-serif;
        }
      `}</style>
    </div>
  )
}
