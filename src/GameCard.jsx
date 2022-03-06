import React from "react";
import ReactCardFlip from "react-card-flip";
import "./GameCard.css";

const GameCard = ({ name, src, index, isFrontSide, cardIsClicked }) => {
  const handleClick = () => {
    cardIsClicked(name, index);
  };

  return (
    <ReactCardFlip className="gameCard" isFlipped={isFrontSide} flipDirection="horizontal">
        <div className="backCardWrapper">
          <div className="backCard" onClick={handleClick}>?</div>
        </div>
        <div className="frontCardWrapper">
          <img className="frontCard" src={src} alt={name} />
        </div>
    </ReactCardFlip>
  );
};

export default GameCard;
