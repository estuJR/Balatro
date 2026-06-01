import { ALL_JOKERS } from '../data/jokers.js'

export function calculateBaseScore(handResult, playedCards) {
  if (!handResult) return { chips: 0, mult: 1, total: 0 }

  const { handInfo } = handResult
  const cardChips = playedCards.reduce((sum, c) => sum + c.chipValue, 0)
  const chips = handInfo.chips + cardChips
  const mult = handInfo.mult

  return { chips, mult, total: chips * mult }
}

export function applyJokers(baseScore, ownedJokerIds, playedCards) {
  let current = { ...baseScore }
  const jokerEffects = []

  for (const jokerId of ownedJokerIds) {
    const joker = ALL_JOKERS.find(j => j.id === jokerId)
    if (!joker) continue

    const result = joker.effect(current, playedCards)
    jokerEffects.push({
      jokerId,
      jokerName: joker.name,
      description: result.description,
      chipsAfter: result.chips,
      multAfter: result.mult,
    })
    current = { chips: result.chips, mult: result.mult }
  }

  return {
    chips: current.chips,
    mult: current.mult,
    total: current.chips * current.mult,
    jokerEffects,
  }
}

export function getTargetScore(round) {
  const base = 300
  const multiplier = Math.pow(1.6, round - 1)
  return Math.floor(base * multiplier)
}