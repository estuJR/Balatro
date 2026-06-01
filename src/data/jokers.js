export const ALL_JOKERS = [
  {
    id: 'multiplier',
    name: 'El Multiplicador',
    emoji: '✖️',
    description: 'Duplica el multiplicador final de tu puntuación.',
    rarity: 'común',
    color: '#e74c3c',
    effect: (score, hand) => ({
      chips: score.chips,
      mult: score.mult * 2,
      description: 'x2 al multiplicador',
    }),
  },
  {
    id: 'accumulator',
    name: 'El Acumulador',
    emoji: '💰',
    description: '+50 chips adicionales a cualquier mano.',
    rarity: 'común',
    color: '#f39c12',
    effect: (score, hand) => ({
      chips: score.chips + 50,
      mult: score.mult,
      description: '+50 chips',
    }),
  },
  {
    id: 'heart_hunter',
    name: 'Cazador de Corazones',
    emoji: '❤️',
    description: 'x2 al multiplicador si juegas 3 o más corazones.',
    rarity: 'poco común',
    color: '#e91e63',
    effect: (score, hand) => {
      const hearts = hand.filter(c => c.suit === 'hearts').length
      if (hearts >= 3) {
        return { chips: score.chips, mult: score.mult * 2, description: `x2 mult (${hearts} ❤️)` }
      }
      return { ...score, description: `sin efecto (${hearts} ❤️)` }
    },
  },
  {
    id: 'spade_geometer',
    name: 'El Geómetra',
    emoji: '♠️',
    description: '+15 chips por cada carta de picas en tu mano.',
    rarity: 'poco común',
    color: '#2c3e50',
    effect: (score, hand) => {
      const spades = hand.filter(c => c.suit === 'spades').length
      return {
        chips: score.chips + spades * 15,
        mult: score.mult,
        description: `+${spades * 15} chips (${spades} ♠️)`,
      }
    },
  },
  {
    id: 'generous',
    name: 'El Generoso',
    emoji: '🎁',
    description: '+20 chips por cada carta jugada.',
    rarity: 'común',
    color: '#27ae60',
    effect: (score, hand) => ({
      chips: score.chips + hand.length * 20,
      mult: score.mult,
      description: `+${hand.length * 20} chips (${hand.length} cartas)`,
    }),
  },
  {
    id: 'breaker',
    name: 'El Rompedor',
    emoji: '💥',
    description: 'x3 al multiplicador si juegas exactamente 5 cartas.',
    rarity: 'raro',
    color: '#8e44ad',
    effect: (score, hand) => {
      if (hand.length === 5) {
        return { chips: score.chips, mult: score.mult * 3, description: 'x3 mult (5 cartas exactas)' }
      }
      return { ...score, description: `sin efecto (${hand.length} cartas)` }
    },
  },
  {
    id: 'alchemist',
    name: 'El Alquimista',
    emoji: '⚗️',
    description: 'Convierte el multiplicador en chips adicionales (+mult×10).',
    rarity: 'raro',
    color: '#16a085',
    effect: (score, hand) => ({
      chips: score.chips + score.mult * 10,
      mult: score.mult,
      description: `+${score.mult * 10} chips (mult→chips)`,
    }),
  },
  {
    id: 'diamond_rain',
    name: 'Lluvia de Diamantes',
    emoji: '♦️',
    description: 'x1.5 chips si hay 2 o más diamantes en tu mano.',
    rarity: 'poco común',
    color: '#3498db',
    effect: (score, hand) => {
      const diamonds = hand.filter(c => c.suit === 'diamonds').length
      if (diamonds >= 2) {
        return {
          chips: Math.floor(score.chips * 1.5),
          mult: score.mult,
          description: `x1.5 chips (${diamonds} ♦️)`,
        }
      }
      return { ...score, description: `sin efecto (${diamonds} ♦️)` }
    },
  },
  {
    id: 'club_card',
    name: 'El Clubero',
    emoji: '♣️',
    description: '+2 al multiplicador por cada trébol jugado.',
    rarity: 'común',
    color: '#1e8449',
    effect: (score, hand) => {
      const clubs = hand.filter(c => c.suit === 'clubs').length
      return {
        chips: score.chips,
        mult: score.mult + clubs * 2,
        description: `+${clubs * 2} mult (${clubs} ♣️)`,
      }
    },
  },
]

export function getRandomJokerOptions(ownedJokers = []) {
  const available = ALL_JOKERS.filter(j => !ownedJokers.includes(j.id))
  if (available.length === 0) return []
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(2, shuffled.length))
}