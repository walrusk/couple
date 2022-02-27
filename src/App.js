import React, {useState,useEffect} from 'react';
import Game from './Game';
import GameMode from './GameMode';
import Stats from './Stats';
import {useGameState} from './game-state';
import SlideToggle from './SlideToggle';

function App() {
  const game = useGameState();
  const [showStats,setShowStats] = useState(false);
  useEffect(updateTheme, []);
  return (
    <div className="App">
      <header className="text-center p-4 bg-base-300">
        <div className="flex items-center justify-center space-x-6">
          <div className="prose">
            <h1 className="m-0"><a href="/" onClick={toggleTheme}>Couple</a></h1>
          </div>
          <GameMode game={game} showStats={showStats} setShowStats={setShowStats} />
        </div>
        <div className="text-center mt-3">
          <small className="opacity-50">Match all pairs to win!</small>
        </div>
      </header>
      <div className="prose mx-auto">
        <div className="w-60 mx-auto">
          <SlideToggle isVisible={showStats}>
            <Stats game={game} setShowStats={setShowStats} />
          </SlideToggle>
        </div>
        <Game game={game} showStats={showStats} setShowStats={setShowStats} />
      </div>
    </div>
  );
}

function updateTheme() {
  const theme = window.localStorage.getItem('theme');
  if (theme !== null) {
    setTheme(theme);
  }
}

function toggleTheme() {
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = window.localStorage.getItem('theme');
  if (theme === null) {
    setTheme(systemDark ? 'light' : 'dark');
  } else {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
}

function setTheme(theme) {
  window.localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

export default App;
