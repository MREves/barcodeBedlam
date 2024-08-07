import React from 'react';

function Character({stats}) {

  return (
    <div class="character">
      <h3>Race: {stats.race}</h3>
      <h3>Strength: {stats.strength}</h3>
      <h3>endurance: {stats.endurance}</h3>
      <h3>Agility: {stats.agility}</h3>
      <h3>Hit Points: {stats.hitPoints}</h3>
      <h3>Luck: {stats.luck}</h3>
    </div>
    
  )
}

export default Character