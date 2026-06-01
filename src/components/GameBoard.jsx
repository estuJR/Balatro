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
        <div className="gameboard__title">BALATRO</div>
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
          background:
            repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px),
            #35682E;
        }
        .gameboard__header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 4px 10px;
          background: linear-gradient(to bottom, #4080D8 0%, #2060C8 50%, #1A54BE 100%);
          border-bottom: 1px solid #0D3A96;
          flex-shrink: 0;
        }
        .gameboard__title {
          font-family: 'Tahoma', Arial, sans-serif;
          font-size: 0.85rem; font-weight: bold;
          color: #FFFFFF;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          letter-spacing: 0.05em;
        }
        .gameboard__header .btn {
          font-size: 10px; padding: 2px 10px; min-height: 20px;
          background: linear-gradient(to bottom, #F0EDE2 0%, #D9D5C8 100%);
          border: 2px outset #DDDBD0;
        }
        .gameboard__main {
          flex: 1; display: flex; gap: 10px;
          padding: 10px 12px; overflow: hidden; min-height: 0;
        }
        .gameboard__left {
          width: 200px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 8px; overflow-y: auto;
        }
        .gameboard__center {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px; overflow: hidden;
        }
        .gameboard__message {
          background: #FFFBE6;
          border: 1px solid #CCA800;
          border-radius: 2px; padding: 4px 12px;
          font-size: 11px; color: #664400;
          font-family: 'Tahoma', Arial, sans-serif;
          animation: fadeIn 0.15s ease;
          box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }
        .gameboard__hand-preview {
          display: flex; align-items: center; gap: 10px;
          background: #ECE9D8;
          border: 1px solid #ACA899;
          border-radius: 2px; padding: 4px 14px;
          box-shadow: 1px 1px 2px rgba(0,0,0,0.15);
        }
        .hand-preview__name {
          font-family: 'Tahoma', Arial, sans-serif;
          font-size: 11px; font-weight: bold; color: #000;
        }
        .hand-preview__score { font-size: 10px; color: #555; }
        .gameboard__cards {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: center; align-content: center;
          padding: 10px; overflow: visible;
        }
        .gameboard__actions {
          display: flex; gap: 8px; flex-wrap: wrap;
          justify-content: center; flex-shrink: 0;
        }
        .gameboard__hint {
          font-size: 10px; color: rgba(255,255,255,0.7);
          font-style: italic;
          text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
        }
        .gameboard__breakdown {
          background: #ECE9D8;
          border: 1px solid #ACA899;
          border-radius: 2px; padding: 6px 10px;
          display: flex; flex-direction: column; gap: 3px;
          font-size: 10px;
          box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }
        .breakdown__row {
          display: flex; justify-content: space-between; gap: 8px; color: #333;
        }
        .breakdown__row--joker { color: #660099; font-size: 10px; }
        .breakdown__total {
          border-top: 1px solid #ACA899;
          padding-top: 3px; color: #000;
          font-family: 'Tahoma', Arial, sans-serif; font-weight: bold;
        }
      `}</style>
    </div>
  )
}