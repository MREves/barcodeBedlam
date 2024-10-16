

export const generateCard = (id, barcode) => ({
  id,
  race: (barcode % 2)+1,
  agility: barcode % 73,
  endurance: barcode % 19,
  strength: barcode % 83 + 20,
  luck: barcode % 89,
  hitPoints: barcode % 97,
})


export const buildRandomDeck = () => {
  return Array.apply(null, Array(3))
    .map((x, index) => {
      const barcode = Math.floor(Math.random() * 9999999999999)
      const card = generateCard(index, barcode)
      return card
    })
}