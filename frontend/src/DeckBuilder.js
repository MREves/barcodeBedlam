import { buildRandomDeck, generateCard } from "./utils/cardHelper";
import { BattleCard } from "./Character";
import React from "react";
import { Button, TextField} from "@mui/material";
import { useDatabaseContext } from "./contexts/DatabaseContext";

export const DeckBuilder = () => {

  const {saveCard} = useDatabaseContext()
  
  const [deck, setDeck] = React.useState([])
  const [card, setCard] = React.useState()
  const [barcode, setBarcode] = React.useState()

  React.useEffect(()=>{
    const newCard = generateCard(null, barcode)
    setCard(newCard)
  }, [barcode])

  React.useEffect(() => {
    const deck = buildRandomDeck()
    setDeck(deck)
    setCard(currentCard => deck[0])
  }, [])

  const onSaveCard = React.useCallback((cardData)=>{
    const savedCard = saveCard(cardData)
    setCard(savedCard)
  }, [setCard, saveCard])

  // display the deck we have built
  return (
    <>
    {/* create text box */}
    <TextField 
    id="barcodeInput" 
    label="BarcodeNumber" 
    variant="filled" 
    sx={{background: 'white'}}
    onChange={(event)=>setBarcode(event.target.value)}
    />

    <Button 
    variant="contained"
    onClick={(event)=>onSaveCard(card)}
    >Save Card</Button>

    <h2>{barcode}</h2>


    {card && <BattleCard card={card}></BattleCard>}
    
    {deck.map(card => {
      <BattleCard card={card}></BattleCard>
    }
    )}
    </>
  )

}