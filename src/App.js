import React, {useState} from 'react';
import Game from './Game';
import GameMode from './GameMode';
import Stats from './Stats';
import {useGameState} from './game-state';

function App() {
  const game = useGameState();
  const [showStats,setShowStats] = useState(false);
  return (
    <div className="App">
      <header className="text-center p-4 bg-base-300">
        <div className="flex items-center justify-center space-x-6">
          <div className="prose">
            <h1 className="m-0">Couple</h1>
          </div>
          <GameMode game={game} showStats={showStats} setShowStats={setShowStats} />
        </div>
        <div className="text-center">
          <small className="opacity-50">Reveal all pairs to win!</small>
        </div>
      </header>
      <div className="prose mx-auto">
        {showStats ? (
          <Stats game={game} setShowStats={setShowStats} />
        ) : (
          <Game game={game} />
        )}
      </div>
    </div>
  );
}

export default App;
