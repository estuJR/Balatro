import { HAND_TYPES } from '../data/deck.js'

export function evaluateHand(cards) {
  if (!cards || cards.length === 0) return null

  const sorted = [...cards].sort((a, b) => b.rankValue - a.rankValue)

  if (cards.length === 5) {
    if (isRoyalFlush(sorted))    return { type: 'ROYAL_FLUSH',    handInfo: HAND_TYPES.ROYAL_FLUSH,    scoringCards: sorted }
    if (isStraightFlush(sorted)) return { type: 'STRAIGHT_FLUSH', handInfo: HAND_TYPES.STRAIGHT_FLUSH, scoringCards: sorted }
    if (isFourOfAKind(sorted))   return { type: 'FOUR_OF_A_KIND', handInfo: HAND_TYPES.FOUR_OF_A_KIND, scoringCards: sorted }
    if (isFullHouse(sorted))     return { type: 'FULL_HOUSE',     handInfo: HAND_TYPES.FULL_HOUSE,     scoringCards: sorted }
    if (isFlush(sorted))         return { type: 'FLUSH',          handInfo: HAND_TYPES.FLUSH,          scoringCards: sorted }
    if (isStraight(sorted))      return { type: 'STRAIGHT',       handInfo: HAND_TYPES.STRAIGHT,       scoringCards: sorted }
  }

  const three = isThreeOfAKind(sorted)
  if (three) return { type: 'THREE_OF_A_KIND', handInfo: HAND_TYPES.THREE_OF_A_KIND, scoringCards: three }

  const twoPair = isTwoPair(sorted)
  if (twoPair) return { type: 'TWO_PAIR', handInfo: HAND_TYPES.TWO_PAIR, scoringCards: twoPair }

  const pair = isPair(sorted)
  if (pair) return { type: 'PAIR', handInfo: HAND_TYPES.PAIR, scoringCards: pair }

  return { type: 'HIGH_CARD', handInfo: HAND_TYPES.HIGH_CARD, scoringCards: [sorted[0]] }
}

function getRankCounts(cards) {
  const counts = {}
  for (const card of cards) {
    counts[card.rank] = (counts[card.rank] || 0) + 1
  }
  return counts
}

function isFlush(cards) {
  return cards.every(c => c.suit === cards[0].suit)
}

function isStraight(cards) {
  const vals = cards.map(c => c.rankValue).sort((a, b) => a - b)
  for (let i = 1; i < vals.length; i++) {
    if (vals[i] - vals[i - 1] !== 1) {
      const lowAce = [14, 2, 3, 4, 5].sort((a, b) => a - b)
      return vals.join() === lowAce.join()
    }
  }
  return true
}

function isRoyalFlush(cards) {
  const royalRanks = new Set(['A', 'K', 'Q', 'J', '10'])
  return isFlush(cards) && cards.every(c => royalRanks.has(c.rank))
}

function isStraightFlush(cards) {
  return isFlush(cards) && isStraight(cards)
}

function isFourOfAKind(cards) {
  const counts = getRankCounts(cards)
  return Object.values(counts).includes(4)
}

function isFullHouse(cards) {
  const counts = Object.values(getRankCounts(cards))
  return counts.includes(3) && counts.includes(2)
}

function isThreeOfAKind(cards) {
  const counts = getRankCounts(cards)
  const tripleRank = Object.keys(counts).find(r => counts[r] === 3)
  if (!tripleRank) return null
  return cards.filter(c => c.rank === tripleRank)
}

function isTwoPair(cards) {
  const counts = getRankCounts(cards)
  const pairs = Object.keys(counts).filter(r => counts[r] === 2)
  if (pairs.length < 2) return null
  return cards.filter(c => pairs.includes(c.rank))
}

function isPair(cards) {
  const counts = getRankCounts(cards)
  const pairRank = Object.keys(counts).find(r => counts[r] === 2)
  if (!pairRank) return null
  return cards.filter(c => c.rank === pairRank)
}