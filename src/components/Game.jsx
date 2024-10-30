import React, { useState, useEffect } from "react";

function Game({ game, changeGame }) {
  const rows = 6;
  const [turn, setTurn] = useState(true); // True: Player 1's turn, False: Player 2's turn
  const [player1, setPlayer1] = useState(1);
  const [player2, setPlayer2] = useState(1);
  const [circleStates, setCircleStates] = useState({});
  const [player1Time, setPlayer1Time] = useState(180); // 3 minutes in seconds
  const [player2Time, setPlayer2Time] = useState(180); // 3 minutes in seconds
  const [gameOver, setGameOver] = useState(false);
  const [start, setStart] = useState(false); // Changed to false by default

  useEffect(() => {
    if (gameOver || player1 > 11 || player2 > 10 || !start) return; // Check if game is over or hasn't started

    const interval = setInterval(() => {
      if (turn) {
        setPlayer1Time((prevTime) => {
          if (prevTime <= 1) {
            setGameOver(true);
            return 0;
          }
          return prevTime - 1;
        });
      } else {
        setPlayer2Time((prevTime) => {
          if (prevTime <= 1) {
            setGameOver(true);
            return 0;
          }
          return prevTime - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turn, gameOver, start]); // Include start in the dependency array

  const handleCircleClick = (row, pos) => {
    if (gameOver || !start) return; // Prevent clicks if game is over or hasn't started

    const circleKey = `${row}-${pos}`;
    if (circleStates[circleKey] || player1 > 11 || player2 > 10) return;

    setCircleStates((prevState) => {
      const newCircleStates = {
        ...prevState,
        [circleKey]: {
          owner: turn ? "Player1" : "Player2",
          number: turn ? player1 : player2,
        },
      };
      return newCircleStates;
    });

    if (turn) {
      setPlayer1((prev) => prev + 1);
    } else {
      setPlayer2((prev) => prev + 1);
    }

    setTurn(!turn);
  };

  const circles = [];
  for (let row = 1; row <= rows; row++) {
    const rowCircles = [];
    for (let pos = 1; pos <= row; pos++) {
      const circleKey = `${row}-${pos}`;
      const circleData = circleStates[circleKey];

      rowCircles.push(
        <div
          key={`circle-${row}-${pos}`}
          id={`circle-${row}-${pos}`}
          className={`w-[40px] h-[40px] sm:w-[65px] sm:h-[65px] hover:scale-105 mx-2 bg-black bg-opacity-90 flex items-center justify-center text-white text-2xl hexagon
            ${
              circleData
                ? circleData.owner === "Player1"
                  ? "bg-neonBlue"
                  : "bg-neonPink"
                : ""
            } 
            ${
              !circleData && !gameOver
                ? "active:scale-95"
                : ""
            }`}
          onClick={() => handleCircleClick(row, pos)}
        >
          {circleData ? circleData.number : ""}
        </div>
      );
    }
    circles.push(
      <div key={`row-${row}`} className="flex justify-center">
        {rowCircles}
      </div>
    );
  }

  const formatTime = (seconds) => {
    
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    game && (
      <div className="text-white text-xl  md:text-5xl font-bold grid grid-cols-3 px-8">
        <div className="flex flex-col items-center justify-center">
          <div
            className={`transform transition-all ease-in-out duration-200 ${
              turn && !gameOver
                ? "neon-outline"
                : "text-gray-400 scale-90 opacity-50"
            }`}
          >
            <p>Player 1</p>
          </div>
          <p className={`text-3xl mt-4 ${turn && !gameOver ? "neon-outline" : "text-gray-400 scale-90 opacity-50"}`}>
            {formatTime(player1Time)}
          </p>
        </div>

        <div className="flex mt-56 flex-col items-center justify-center sm:mt-2 md:mt-10">
          {circles}
          {(gameOver || player1 > 11 || player2 > 10) && (
            <p className="text-white mt-4 text-2xl font-bold tracking-wider">GAME OVER!</p>
          )}
          {!start && (
            <button
              onClick={() => {
                setStart(true); // Start the game on button click
              }}
              className="border-2 absolute bottom-3 border-white rounded-lg px-2 py-1 text-white mt-4 text-xl hover:scale-105 active:scale-95 transform duration-300 font-bold tracking-wider"
            >
              START
            </button>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <div
            className={`transform transition-all ease-in-out duration-200 ${
              !turn && !gameOver
                ? "neon-pink-outline"
                : "text-gray-400 scale-90 opacity-50"
            }`}
          >
            <p>Player 2</p>
          </div>
          <p className={`text-3xl mt-4 ${!turn ? "neon-pink-outline" : "text-gray-400 scale-90 opacity-50"}`}>
            {formatTime(player2Time)}
          </p>
        </div>
      </div>
    )
  );
}

export default Game;
