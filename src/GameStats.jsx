import React from "react";
import "./GameStats.css";

const GameStats = ({ gameState }) => {
  return (
    // <div className={`${className} gameStats`}>
    //   <div className="statText">Score {gameState.score}</div>
    //   <div className="statText">Attempts {gameState.attempts}</div>
    // </div>
    <div className="gameStats">
      <div className="stat">Score {gameState.score}</div>
      <div className="stat">Attempts {gameState.attempts}</div>
    </div>
  );
};

export default GameStats;
