import React from 'react';

export function BattleCard({card}) {

  return (
    <div className="character">
      <h3>Hit Points: {card.hitPoints}</h3>
      {/* <h3>Race: {stats.race}</h3> */}
      <h3>Strength: {card.strength}</h3>
      <h3>Endurance: {card.endurance}</h3>
      <h3>Agility: {card.agility}</h3>
      <h3>Luck: {card.luck}</h3>
    </div>
    
  )
}

