import shuffleArray from "./shuffleArray";
import shortid from "shortid";

export const generateBoardData = (gameParams) => {
  return shuffleArray(generateData(gameParams));
};

const generateData = ({ cardsData, repetitions }) => {
  const result = [];
  for (let i = 0; i < cardsData.length; i++) {
    for (let j = 0; j < repetitions; j++) {
      result.push({ ...cardsData[i], key: shortid.generate() });
    }
  }
  return result;
};
