import React, { useEffect, useState, useRef } from "react";
import GameCard from "./GameCard";
import WinText from "./WinText";
import "./GameBoard.css";

const GameBoard = ({
  incrementScoreAndAttempts,
  incrementAttempts,
  playCoinSound,
  isAWin,
  selectedCards,
  setSelectedCards,
  data,
  setData
}) => {
  const [isClickEnabled, setClickEnabled] = useState(true);
  const timerIdForCheckingCards = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerIdForCheckingCards);
  }, []);

  const cardIsClicked = (name, index) => {
    console.log(`cardIsClicked2 selectedCards.length: ${selectedCards.length}`);
    const cardsToChange = [{ name, index, isFrontSide: true }];
    setSelectedCards(getUpdatedSelectedCards(selectedCards, cardsToChange));

    setData(getUpdatedData(data, cardsToChange));

    const newSelectedCards = [
      ...selectedCards,
      {
        name,
        index
      }
    ];
    const areTwoCardsSelected = newSelectedCards.length > 1;

    if (areTwoCardsSelected) {
      setClickEnabled(false);
      const isMatch = isACardMatch(newSelectedCards);
      if (isMatch) {
        incrementScoreAndAttempts();
        playCoinSound();
      } else {
        incrementAttempts();
      }
      const cardsToChange = getCardsToChange(newSelectedCards, isMatch);
      console.log("cardsToChange");
      console.log(cardsToChange);

      timerIdForCheckingCards.current = setTimeout(() => {
        setSelectedCards(getUpdatedSelectedCards(selectedCards, cardsToChange));
        setData(getUpdatedData(data, cardsToChange));
        setClickEnabled(true);
      }, 1000);
    }
  };

  return (
    <div className="gameBoard">
      {isAWin ? (
        <WinText />
      ) : (
        <div className="grid">
          {data.map((elem, index) => {
            return (
              <GameCard
                {...elem}
                index={index}
                cardIsClicked={isClickEnabled ? cardIsClicked : () => {}}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const isACardMatch = (selectedCards) => {
  console.log("isACardMatch");
  if (selectedCards.length > 1) {
    const [first, second] = selectedCards;
    return first.name === second.name;
  }
  return false;
};

const getCardsToChange = (selectedCards, isACardMatch) => {
  return selectedCards.map((elem) => {
    return { ...elem, isFrontSide: isACardMatch };
  });
};

const getUpdatedData = (data, cardsToChange) => {
  return data.map((elem, index) => {
    for (const card of cardsToChange) {
      if (card.index === index) {
        return { ...elem, isFrontSide: card.isFrontSide };
      }
    }
    return elem;
  });
};

const getUpdatedSelectedCards = (selectedCards, cardsToChange) => {
  const areTwoCardsChanged = cardsToChange.length > 1;
  return areTwoCardsChanged ? [] : [...selectedCards, ...cardsToChange];
};

export default GameBoard;
