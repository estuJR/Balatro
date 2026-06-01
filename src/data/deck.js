export const SUITS = [
  { id: 'hearts',   symbol: '♥', name: 'Corazones', color: 'red'   },
  { id: 'diamonds', symbol: '♦', name: 'Diamantes', color: 'red'   },
  { id: 'clubs',    symbol: '♣', name: 'Tréboles',  color: 'black' },
  { id: 'spades',   symbol: '♠', name: 'Picas',     color: 'black' },
]

export const RANKS = [
  { id: 'A',  name: 'As',     value: 14, chipValue: 11 },
  { id: 'K',  name: 'Rey',    value: 13, chipValue: 10 },
  { id: 'Q',  name: 'Reina',  value: 12, chipValue: 10 },
  { id: 'J',  name: 'Jota',   value: 11, chipValue: 10 },
  { id: '10', name: 'Diez',   value: 10, chipValue: 10 },
  { id: '9',  name: 'Nueve',  value: 9,  chipValue: 9  },
  { id: '8',  name: 'Ocho',   value: 8,  chipValue: 8  },
  { id: '7',  name: 'Siete',  value: 7,  chipValue: 7  },
  { id: '6',  name: 'Seis',   value: 6,  chipValue: 6  },
  { id: '5',  name: 'Cinco',  value: 5,  chipValue: 5  },
  { id: '4',  name: 'Cuatro', value: 4,  chipValue: 4  },
  { id: '3',  name: 'Tres',   value: 3,  chipValue: 3  },
  { id: '2',  name: 'Dos',    value: 2,  chipValue: 2  },
]

export const HAND_TYPES = {
  ROYAL_FLUSH:     { name: 'Escalera Real',     chips: 100, mult: 8 },
  STRAIGHT_FLUSH:  { name: 'Escalera de Color', chips: 100, mult: 8 },
  FOUR_OF_A_KIND:  { name: 'Póker',             chips: 60,  mult: 7 },
  FULL_HOUSE:      { name: 'Full House',         chips: 40,  mult: 4 },
  FLUSH:           { name: 'Color',              chips: 35,  mult: 4 },
  STRAIGHT:        { name: 'Escalera',           chips: 30,  mult: 4 },
  THREE_OF_A_KIND: { name: 'Trío',               chips: 30,  mult: 3 },
  TWO_PAIR:        { name: 'Doble Par',          chips: 20,  mult: 2 },
  PAIR:            { name: 'Par',                chips: 10,  mult: 2 },
  HIGH_CARD:       { name: 'Carta Alta',         chips: 5,   mult: 1 },
}

export function createFullDeck() {
  const deck = []
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank.id}-${suit.id}`,
        rank: rank.id,
        rankName: rank.name,
        rankValue: rank.value,
        chipValue: rank.chipValue,
        suit: suit.id,
        suitSymbol: suit.symbol,
        suitName: suit.name,
        color: suit.color,
      })
    }
  }
  return deck
}