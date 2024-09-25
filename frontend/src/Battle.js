import './App.css';
import React, { useEffect } from 'react';
import Player from './Player'
import { Grid } from '@mui/material'
import { useDatabaseContext } from './contexts/DatabaseContext';
import { buildRandomDeck } from './utils/cardHelper';
//import { generateCard } from './utils/cardHelper';

export const Battle = () => {

  const {getPlayers} = useDatabaseContext()
  
  const [playerOneDeck, setPlayerOneDeck] = React.useState([])
  const [playerTwoDeck, setPlayerTwoDeck] = React.useState([])
  const [playerOneCard, setPlayerOneCard] = React.useState({})
  const [playerTwoCard, setPlayerTwoCard] = React.useState({})
  const [currentAttacker, setCurrentAttacker] = React.useState(1)

  useEffect(()=>{
    getPlayers()
  }, [getPlayers])



  React.useEffect(() => {
    const playerOneDeck = buildRandomDeck()
    setPlayerOneDeck(playerOneDeck)
    setPlayerOneCard(currentCard => playerOneDeck[0])

    const playerTwoDeck = buildRandomDeck()
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
