import React from 'react';
import Character from './Character';



function Player({playerName, code, setCode, stats}) {
  return (
    <div class="playerArea" id="playerOne">
      <h2>{playerName}</h2>
      <input type="text" value={code} onChange={e => setCode(e.target.value)}></input>

      <Character stats={stats}></Character>

    </div>
  )
}

export default Player