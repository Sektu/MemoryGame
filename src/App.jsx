import "./App.css";
import GameBoard from "./GameBoard";
import GameStats from "./GameStats";
import GameSettings from "./GameSettings";
import React, { useState, useMemo } from "react";
import { generateBoardData } from "./generateBoardData";

import catImg from "./img/cat.jpg";
import dogImg from "./img/dog.jpg";
import pandaImg from "./img/panda.jpg";
import koalaImg from "./img/koala.jpg";
import flamingoImg from "./img/flamingo.jpg";
import butterflyImg from "./img/butterfly.jpg";

import musicMp3 from "./music/M33 Project - Cool Jazzy Bass & Vibraphone.mp3";
import coinWav from "./sounds/coin.wav";
import winWav from "./sounds/win.wav";

export default function App() {
  const [gameParams] = useState(useMemo(() => getGameParams(), []));
  const [sounds] = useState(useMemo(() => getSounds(), []));

  const [data, setData] = useState(generateBoardData(gameParams));
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameState, setGameState] = useState({
    score: 0,
    attempts: 0,
    isAWin: false
  });
  const [settings, setSettings] = useState({
    isSounds: false,
    isMusic: false
  });
  
  const incrementScoreAndAttempts = () => {
    console.log("incrementing score");
    const newScore = gameState.score + 1;
    const newAttempts = gameState.attempts + 1;

    const isAWin = newScore >= gameParams.cardsData.length;
    if (isAWin) {
      setGameState({
        ...gameState,
        score: newScore,
        attempts: newAttempts,
        isAWin: true
      });
      playWinSound();
    } else {
      setGameState({ ...gameState, score: newScore, attempts: newAttempts });
    }
  };

  const incrementAttempts = () => {
    console.log("incrementing attempts");
    setGameState({ ...gameState, attempts: gameState.attempts + 1 });
  };

  const clearGameState = () => {
    setGameState({
      score: 0,
      attempts: 0,
      isAWin: false
    });
  };

  const playWinSound = () => {
    if (settings.isSounds) {
      sounds.win.play();
    }
  };

  const playCoinSound = () => {
    if (settings.isSounds) {
      sounds.coin.play();
    }
  };

  const restartGameClick = () => {
    setData(generateBoardData(gameParams));
    setSelectedCards([]);
    clearGameState();
  }

  return (
    <div className="App2">
      <GameStats gameState={gameState}/>
      <GameBoard 
        incrementScoreAndAttempts={incrementScoreAndAttempts}
        incrementAttempts={incrementAttempts}
        playCoinSound={playCoinSound}
        isAWin={gameState.isAWin}
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
        data={data}
        setData={setData}
      />
      <div className="gameFooter">
        <button 
          className="restartButton"
          onClick={restartGameClick}
          >Restart</button>
        <GameSettings 
          settings={settings}
          setSettings={setSettings}
          sounds={sounds}
        />
      </div>
    </div>
  );
}

const getGameParams = () => {
  return {
    cardsData: [
      { name: "cat", src: catImg, isFrontSide: false },
      { name: "dog", src: dogImg, isFrontSide: false },
      { name: "panda", src: pandaImg, isFrontSide: false },
      { name: "koala", src: koalaImg, isFrontSide: false },
      { name: "flamingo", src: flamingoImg, isFrontSide: false },
      { name: "butterfly", src: butterflyImg, isFrontSide: false }
    ],
    repetitions: 2
  };
};

const getSounds = () => {
  const music = new Audio(musicMp3);
  music.volume = 0.03;
  music.loop = true;

  const coin = new Audio(coinWav);
  coin.volume = 0.1;

  const win = new Audio(winWav);
  win.volume = 0.1;

  return {
    coin: coin,
    win: win,
    music: music
  };
};
