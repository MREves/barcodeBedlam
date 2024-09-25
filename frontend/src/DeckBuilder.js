import { buildRandomDeck, generateCard } from "./utils/cardHelper";
import { BattleCard } from "./Character";
import React from "react";

export const DeckBuilder = () => {

  //const {getPlayers} = useDatabaseContext()
  
  const [deck, setDeck] = React.useState([])
  const [card, setCard] = React.useState()

  React.useEffect(() => {
    const deck = buildRandomDeck()
    setDeck(deck)
    setCard(currentCard => deck[0])
  }, [])

  // display the deck we have built
  return (
    <>
    {card && <BattleCard card={card}></BattleCard>}
    
    {deck.map(card => {
      <BattleCard card={card}></BattleCard>
    }
    )}
    </>
  )

}