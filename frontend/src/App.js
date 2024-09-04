import './App.css';
import React, { useEffect } from 'react';
import Player from './Player'
import { Grid } from '@mui/material'
import { useDatabaseContext } from './contexts/DatabaseContext';

const App = () => {

  const {getPlayers} = useDatabaseContext()
  
  const [playerOneDeck, setPlayerOneDeck] = React.useState([])
  const [playerTwoDeck, setPlayerTwoDeck] = React.useState([])
  const [playerOneCard, setPlayerOneCard] = React.useState({})
  const [playerTwoCard, setPlayerTwoCard] = React.useState({})
  const [currentAttacker, setCurrentAttacker] = React.useState(1)

  useEffect(()=>{
    getPlayers()
  }, [getPlayers])


  const generateCard = (id, barcode) => ({
    id,
    race: barcode % 11,
    agility: barcode % 73,
    endurance: barcode % 19,
    strength: barcode % 83 + 20,
    luck: barcode % 89,
    hitPoints: barcode % 97,
  })

  const buildDeck = () => {
    return Array.apply(null, Array(3))
      .map((x, index) => {
        const barcode = Math.floor(Math.random() * 9999999999999)
        const card = generateCard(index, barcode)
        return card
      })
  }

  React.useEffect(() => {
    const playerOneDeck = buildDeck()
    setPlayerOneDeck(playerOneDeck)
    setPlayerOneCard(currentCard => playerOneDeck[0])

    const playerTwoDeck = buildDeck()
    setPlayerTwoDeck(playerTwoDeck)
    setPlayerTwoCard(currentCard => playerTwoDeck[0])
  }, [])

  const maxStat = 100;

  const attack = (isPlayer1Attacking) => {
    const attacker = isPlayer1Attacking ? playerOneCard : playerTwoCard;
    const defender = isPlayer1Attacking ? playerTwoCard : playerOneCard;

    // reconcile stats between player characters
    const randomNumber = Math.floor((Math.random() * 2 * maxStat)) * 1.5;
    const dodged = randomNumber < (defender.luck + defender.agility)
    const hitDamage = Math.max(0, attacker.strength - defender.endurance)

    setCurrentAttacker(currentValue => (1 - (currentValue - 1)) + 1)

    if (dodged) {
      console.log("Dodged!")
      return;
    }

    defender.hitPoints -= hitDamage
    console.log("New HP: ", defender.hitPoints)

    if (isPlayer1Attacking) {
      setPlayerTwoCard(currentValue => defender)
    }
    else {
      setPlayerOneCard(currentValue => defender)
    }
  }

  return (
    <div className="App">
      <h1 className="neonText">Barcode Bedlam</h1>
      <Grid container direction={"row"}>
        <Grid item xs={12} md={6}>
          <Player
            id={"player1"}
            playerName={"Player 1"}
            deck={playerOneDeck}
            currentCard={playerOneCard}
            setCard={setPlayerOneCard}
            attack={attack}
            isCurrentAttacker={currentAttacker === 1}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Player
            id={"player2"}
            playerName={"Player 2"}
            deck={playerTwoDeck}
            currentCard={playerTwoCard}
            setCard={setPlayerTwoCard}
            attack={attack}
            isCurrentAttacker={currentAttacker === 2}
          />
        </Grid>
      </Grid>
    </div >
  );
}

export default App;
