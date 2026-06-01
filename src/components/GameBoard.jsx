import React, { useState, useCallback } from 'react'
import Card from './Card.jsx'
import ScoreDisplay from './ScoreDisplay.jsx'
import JokerSelector from './JokerSelector.jsx'
import ActiveJokers from './ActiveJokers.jsx'
import GameOver from './GameOver.jsx'
import { createFullDeck } from '../data/deck.js'
import { getRandomJokerOptions } from '../data/jokers.js'
import { shuffle, dealCards, replaceCards } from '../utils/deckUtils.js'
import { evaluateHand } from '../utils/handEvaluator.js'
import { calculateBaseScore, applyJokers, getTargetScore } from '../utils/scoreCalculator.js'

const HAND_SIZE = 8
const MAX_SELECTED = 5

function initGame() {
  const deck = shuffle(createFullDeck())
  const { hand, remaining } = dealCards(deck, HAND_SIZE)
  return {
    deck: remaining,
    hand,
    selectedIds: [],
    round: 1,
    roundScore: 0,
    totalScore: 0,
    lives: 3,
    ownedJokers: [],
    phase: 'playing',
    lastHandResult: null,
    lastScoreBreakdown: null,
    jokerOptions: [],
    message: '',
    discardCount: 3,
  }
}

export default function GameBoard({ onMenu, highScore, onScoreUpdate }) {
  const [state, setState] = useState(initGame)

  const target = getTargetScore(state.round)
  const selectedCards = state.hand.filter(c => state.selectedIds.includes(c.id))
  const handResult = selectedCards.length > 0 ? evaluateHand(selectedCards) : null

  const toggleCard = useCallback((card) => {
    setState(prev => {
      const already = prev.selectedIds.includes(card.id)
      if (!already && prev.selectedIds.length >= MAX_SELECTED) return prev
      return {
        ...prev,
        selectedIds: already
          ? prev.selectedIds.filter(id => id !== card.id)
          : [...prev.selectedIds, card.id],
      }
    })
  }, [])

  const playHand = useCallback(() => {
    if (selectedCards.length === 0) return

    setState(prev => {
      const result = evaluateHand(selectedCards)
      if (!result) return prev

      const base = calculateBaseScore(result, selectedCards)
      const final = applyJokers(base, prev.ownedJokers, selectedCards)
      const newRoundScore = prev.roundScore + final.total
      const newTotalScore = prev.totalScore + final.total
      onScoreUpdate && onScoreUpdate(newTotalScore)

      const { newHand, newDeck } = replaceCards(prev.hand, prev.selectedIds, prev.deck)

      if (newRoundScore >= target) {
        const jokerOptions = getRandomJokerOptions(prev.ownedJokers)
        if (jokerOptions.length === 0) {
          return startNextRound(prev, newHand, newDeck, newTotalScore, prev.ownedJokers)
        }
        return {
          ...prev,
          hand: newHand, deck: newDeck, selectedIds: [],
          roundScore: newRoundScore, totalScore: newTotalScore,
          lastHandResult: result, lastScoreBreakdown: final,
          phase: 'joker-select', jokerOptions,
          message: `✅ ${result.handInfo.name}: +${final.total.toLocaleString()} pts`,
        }
      }

      if (newDeck.length === 0 && newHand.length === 0) {
        return { ...prev, hand: newHand, deck: newDeck, selectedIds: [],
          roundScore: newRoundScore, totalScore: newTotalScore,
          lastHandResult: result, lastScoreBreakdown: final, phase: 'gameover' }
      }

      return {
        ...prev,
        hand: newHand, deck: newDeck, selectedIds: [],
        roundScore: newRoundScore, totalScore: newTotalScore,
        lastHandResult: result, lastScoreBreakdown: final,
        message: `${result.handInfo.name}: +${final.total.toLocaleString()} pts`,
      }
    })
  }, [selectedCards, target, onScoreUpdate])

  const discardSelected = useCallback(() => {
    setState(prev => {
      if (prev.discardCount <= 0 || prev.selectedIds.length === 0) return prev
      const { newHand, newDeck } = replaceCards(prev.hand, prev.selectedIds, prev.deck)
      return {
        ...prev, hand: newHand, deck: newDeck, selectedIds: [],
        discardCount: prev.discardCount - 1,
        message: `Descartaste ${prev.selectedIds.length} carta(s)`,
      }
    })
  }, [])

  const selectJoker = useCallback((jokerId) => {
    setState(prev => {
      const newJokers = [...prev.ownedJokers, jokerId]
      return startNextRound(prev, prev.hand, prev.deck, prev.totalScore, newJokers)
    })
  }, [])

  function startNextRound(prev, hand, deck, totalScore, ownedJokers) {
    const nextRound = prev.round + 1
    const newDeck = shuffle(createFullDeck())
    const { hand: newHand, remaining: newRemaining } = dealCards(newDeck, HAND_SIZE)
    return {
      ...prev,
      deck: newRemaining, hand: newHand, selectedIds: [],
      round: nextRound, roundScore: 0, totalScore,
      ownedJokers, phase: 'playing', jokerOptions: [],
      message: `🃏 Ronda ${nextRound} — objetivo: ${getTargetScore(nextRound).toLocaleString()}`,
      discardCount: 3,
    }
  }

  const breakdown = state.lastScoreBreakdown

  return (
    <div className="gameboard">
      <div className="gameboard__header">
        <button className="btn btn-secondary" onClick={onMenu}>← Menú</button>
        <div className="gameboard__title glow-gold">BALATRO</div>
        <button className="btn btn-secondary" onClick={() => setState(initGame())}>🔄 Reiniciar</button>
      </div>

      <div className="gameboard__main">
        <div className="gameboard__left">
          <ScoreDisplay
            score={state.roundScore}
            target={target}
            round={state.round}
            deckLeft={state.deck.length}
            lives={state.lives}
            handResult={handResult || state.lastHandResult}
          />
          <ActiveJokers jokerIds={state.ownedJokers} />
          {breakdown && (
            <div className="gameboard__breakdown">
              <div className="breakdown__row">
                <span>Base</span>
                <span>{breakdown.chips} × {breakdown.mult}</span>
              </div>
              {breakdown.jokerEffects && breakdown.jokerEffects.map((e, i) => (
                <div key={i} className="breakdown__row breakdown__row--joker">
                  <span>{e.jokerName}</span>
                  <span>{e.description}</span>
                </div>
              ))}
              <div className="breakdown__row breakdown__total">
                <span>Total</span>
                <span className="glow-gold">+{breakdown.total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="gameboard__center">
          {state.message && (
            <div className="gameboard__message">{state.message}</div>
          )}
          {handResult && (
            <div className="gameboard__hand-preview">
              <span className="hand-preview__name">{handResult.handInfo.name}</span>
              <span className="hand-preview__score">
                {handResult.handInfo.chips}+chips × {handResult.handInfo.mult}x
              </span>
            </div>
          )}
          <div className="gameboard__cards">
            {state.hand.map((card, i) => (
              <Card
                key={card.id}
                card={card}
                selected={state.selectedIds.includes(card.id)}
                onClick={toggleCard}
                dealIndex={i}
                disabled={state.phase !== 'playing'}
              />
            ))}
          </div>
          <div className="gameboard__actions">
            <button
              className="btn btn-primary"
              onClick={playHand}
              disabled={selectedCards.length === 0 || state.phase !== 'playing'}
            >
              🃏 Jugar mano ({selectedCards.length})
            </button>
            <button
              className="btn btn-secondary"
              onClick={discardSelected}
              disabled={selectedCards.length === 0 || state.discardCount <= 0 || state.phase !== 'playing'}
            >
              🗑️ Descartar ({state.discardCount})
            </button>
          </div>
          <div className="gameboard__hint">
            {state.selectedIds.length === 0
              ? 'Selecciona 1-5 cartas para jugar'
              : `${state.selectedIds.length} carta(s) seleccionada(s) · máx. ${MAX_SELECTED}`}
          </div>
        </div>
      </div>

      {state.phase === 'joker-select' && (
        <JokerSelector options={state.jokerOptions} onSelect={selectJoker} round={state.round} />
      )}
      {state.phase === 'gameover' && (
        <GameOver
          round={state.round}
          totalScore={state.totalScore}
          highScore={highScore}
          onRestart={() => setState(initGame())}
          onMenu={onMenu}
        />
      )}

      <style>{`
        .gameboard {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          background: radial-gradient(ellipse at 30% 20%, #1a0f2a 0%, #0a0608 60%);
        }
        .gameboard__header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 20px;
          border-bottom: 1px solid rgba(240,192,64,0.15);
          background: rgba(0,0,0,0.3); flex-shrink: 0;
        }
        .gameboard__title {
          font-family: var(--font-display); font-size: 1.4rem;
          font-weight: 900; color: var(--accent-gold); letter-spacing: 0.15em;
        }
        .gameboard__main {
          flex: 1; display: flex; gap: 16px;
          padding: 14px 16px; overflow: hidden; min-height: 0;
        }
        .gameboard__left {
          width: 220px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 14px; overflow-y: auto;
        }
        .gameboard__center {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; gap: 12px; overflow: hidden;
        }
        .gameboard__message {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(240,192,64,0.2);
          border-radius: 8px; padding: 8px 16px;
          font-size: 0.85rem; color: var(--accent-gold);
          font-family: var(--font-heading); animation: fadeIn 0.2s ease;
        }
        .gameboard__hand-preview {
          display: flex; align-items: center; gap: 12px;
          background: rgba(240,192,64,0.08);
          border: 1px solid rgba(240,192,64,0.3);
          border-radius: 8px; padding: 6px 16px;
        }
        .hand-preview__name {
          font-family: var(--font-heading); font-size: 0.9rem; color: var(--accent-gold);
        }
        .hand-preview__score { font-size: 0.78rem; color: var(--text-muted); }
        .gameboard__cards {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: center; align-content: flex-start;
          flex: 1; padding: 20px 10px 30px; overflow: visible;
        }
        .gameboard__actions {
          display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; flex-shrink: 0;
        }
        .gameboard__hint {
          font-size: 0.72rem; color: var(--text-dim); font-style: italic;
        }
        .gameboard__breakdown {
          background: rgba(26,18,32,0.9);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; padding: 10px 12px;
          display: flex; flex-direction: column; gap: 4px; font-size: 0.75rem;
        }
        .breakdown__row {
          display: flex; justify-content: space-between; gap: 8px; color: var(--text-muted);
        }
        .breakdown__row--joker { color: var(--accent-purple); font-size: 0.7rem; }
        .breakdown__total {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 4px; color: var(--text-primary);
          font-family: var(--font-heading); font-weight: 700;
        }
      `}</style>
    </div>
  )
}