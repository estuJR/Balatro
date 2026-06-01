export function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function dealCards(deck, count) {
  const hand = deck.slice(0, count)
  const remaining = deck.slice(count)
  return { hand, remaining }
}

export function replaceCards(currentHand, selectedIds, deck) {
  const count = selectedIds.length
  const cardsToAdd = deck.slice(0, count)
  const newDeck = deck.slice(count)

  const newHand = currentHand.map(card => {
    if (selectedIds.includes(card.id)) {
      const replacement = cardsToAdd.shift()
      return replacement || null
    }
    return card
  }).filter(Boolean)

  return { newHand, newDeck }
}