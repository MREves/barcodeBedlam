import './App.css';
import React from 'react';
import Player from './Player'

function App() {
  const defaultPlayerStats = {
    race: 0,
    strength: 0,
    endurance: 0,
    agility: 0,
    hitPoints: 0,
    luck: 0,
  }

  const [playerOneCode, setPlayerOneCode] = React.useState(0)
  const [playerTwoCode, setPlayerTwoCode] = React.useState(0)
  const [playerOneStats, setPlayerOneStats] = React.useState(defaultPlayerStats)
  const [playerTwoStats, setPlayerTwoStats] = React.useState(defaultPlayerStats)
  
  const generateStats = (barcode)=>{
    const newStats = 
    {
    race: barcode % 11,
    strength: barcode % 13,
    endurance: barcode % 17,
    agility: barcode % 19,
    hitPoints: barcode % 23,
    luck: barcode % 27
  }
  return newStats
}

React.useEffect(()=>{setPlayerOneStats(generateStats(playerOneCode))}, [playerOneCode])
React.useEffect(()=>{setPlayerTwoStats(generateStats(playerTwoCode))}, [playerTwoCode])

  return (
    <div className="App">
      <h1 class="neonText">Barcode Bedlam</h1>
      <Player 
      playerName={"Player 1"} 
      code={playerOneCode}
      setCode={setPlayerOneCode}
      stats={playerOneStats}/>

      <Player 
      playerName={"Player 2"}
      code={playerTwoCode}
      setCode={setPlayerTwoCode}
      stats={playerTwoStats}
      />
      
    </div>
  );
}

export default App;
