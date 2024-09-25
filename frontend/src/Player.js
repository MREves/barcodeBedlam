import React from 'react';
import {BattleCard} from './Character';
import { Button, Chip, Grid } from '@mui/material';

const Player = ({
  id,
  playerName,
  deck,
  currentCard,
  setCard,
  attack,
  isCurrentAttacker,
}) => {
  const [dead, setDead] = React.useState(false)

  React.useEffect(() => {
    if (currentCard.hitPoints <= 0 && currentCard.id < 2) {
      setCard(currentCard => deck[currentCard.id + 1])
    }
  }, [deck, currentCard, currentCard.hitPoints, setCard])

  React.useEffect(() => {
    setDead(currentCard.id === 2 && currentCard.hitPoints < 0)
  }, [currentCard, currentCard.hitPoints])

  return (
    <Grid container direction="row">
      <Grid item xs={12} sm={6} id={id}>
        <div className="playerArea">
          <h2>{playerName}</h2>
          <Chip
            label={`Card ${currentCard.id + 1}`}
            color={currentCard.id === 0
              ? "success"
              : currentCard.id === 1
                ? "warning"
                : "error"
            } />
          <BattleCard card={currentCard}></BattleCard>
          <Button
            disabled={!isCurrentAttacker || dead}
            variant="contained"
            color="error"
            onClick={() => attack(id === "player1")}>
            Attack
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        {!dead 
          ?
          <img
            alt="Character"
            src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2017%2F07%2Ftime-15-influential-video-game-characters-0.jpg?cbr=1&q=90"
            style={{ marginTop: "2em", padding: "1em 2em 1em 1em" }}
            width="100%"
          />
          : <p style={{ fontSize: "3em", color: "white" }}>YOU ARE DEAD</p>
        }
      </Grid>
    </Grid>
  )
}

export default Player