import React from "react";

function MainMenu({game, changeGame}) {
  return (
    !game && <div className="flex flex-col justify-around items-center text-white p-2 h-screen">
      <div className="flex flex-col items-center">
        <p class="neon-outline text-5xl md:text-7xl font-bold">Black Hole</p>
        <p class="neon-pink-outline text-center text-xl md:text-3xl font-semibold tracking-wide">
          By The KGPian Game Theory Society
        </p>
      </div>
      <div>
        <button onClick={()=>{changeGame(true)}} class="neon-outline text-3xl hover:scale-105 transition transform ease-in-out duration-200 active:scale-100 font-bold px-6 py-2 rounded-lg bg-black/20 border border-neonBlue hover:bg-gray-900">
          Play
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
