import React from 'react';

const GameScore = ({ score }) => (
  <div className="game-score" data-tid="Menu-scores">
    Очки: {score}
  </div>
);

export default GameScore;
