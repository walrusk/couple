import React, {useEffect} from 'react';
import {useLocalStorageToggle} from './hooks';

function GameMode({ game, showStats, setShowStats }) {
  const { practice, practiceOn, practiceOff, hasWon, randomPracticeSeed } = game;
  const [wonDaily,,setHasWonDaily] = useLocalStorageToggle('won-today', !practice ? hasWon : false);
  useEffect(() => {
    if (!practice && hasWon) {
      setHasWonDaily();
    }
  }, [practice,hasWon,setHasWonDaily]);
  function practiceButton() {
    randomPracticeSeed();
    practiceOn();
  }
  return (
    <div className="btn-group relative top-0.5">
      <button className={`btn btn-xs ${!practice && 'btn-active'}`} onClick={practiceOff}>Daily {wonDaily && '✅'}</button>
      <button className={`btn btn-xs ${practice && 'btn-active'}`} onClick={practiceButton}>Practice</button>
      <button className={`btn btn-xs ${showStats && 'btn-active'}`} onClick={() => setShowStats(!showStats)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}

export default GameMode;
