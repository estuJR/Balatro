import React, { useState } from 'react'
import MenuScreen from './components/MenuScreen.jsx'
import GameBoard from './components/GameBoard.jsx'
import './assets/styles/global.css'

export default function App() {
  const [screen, setScreen] = useState('menu')
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('balatro-hs') || '0', 10) } catch { return 0 }
  })

  function handleScoreUpdate(score) {
    if (score > highScore) {
      setHighScore(score)
      try { localStorage.setItem('balatro-hs', String(score)) } catch {}
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {screen === 'menu' && (
        <MenuScreen onStart={() => setScreen('game')} highScore={highScore} />
      )}
      {screen === 'game' && (
        <GameBoard
          onMenu={() => setScreen('menu')}
          highScore={highScore}
          onScoreUpdate={handleScoreUpdate}
        />
      )}
    </div>
  )
}