import React, { useState, useRef, useEffect } from 'react';
import MainMenu from "./components/MainMenu";
import music from "./assets/music.mp3";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";
import "./App.css";
import Game from "./components/Game";

function App() {
  const audioRef = useRef(null);
  const [game, changeGame] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Start with music playing
  const fixedVolume = 0.5; // Set your desired volume here (0.0 to 1.0)

  useEffect(() => {
    // Set the audio volume and loop when the component mounts
    if (audioRef.current) {
      audioRef.current.volume = fixedVolume; // Set the fixed volume
      audioRef.current.loop = true; // Loop the music
      audioRef.current.play(); // Start playing the music automatically
    }

    // Cleanup function to pause the audio when the component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [fixedVolume]); // Only run once when the component mounts

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the music
    } else {
      audioRef.current.play(); // Resume playing
    }
    setIsPlaying(!isPlaying); // Toggle the play state
  };

  return (
    <>
    <MainMenu game={game} changeGame={changeGame}/>
    <Game game={game} changeGame={changeGame}/>
      <button
        onClick={togglePlay}
        className="text-white absolute top-2 right-2 p-2 text-3xl"
      >
        {isPlaying ? <FaVolumeHigh /> : <FaVolumeXmark />}
      </button>
      <audio ref={audioRef} src={music} />
    </>
  );
}

export default App;
