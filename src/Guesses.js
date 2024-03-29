import React from 'react';
import {MAX_GUESSES} from './game-constants';
import SlideToggle from './SlideToggle';
import {useLocalStorageToggle} from './hooks';

function Guesses({ game, className }) {
  const { hasWon, hasLost, guesses, guess_count, board } = game;
  const lastRow = guess_count > MAX_GUESSES - 4;
  const [showGuesses,toggleShowGuesses] = useLocalStorageToggle('show_guesses', false);
  const gameIsDone = hasWon || hasLost;
  const pairs = guesses.reduce((pairs, guess, i) => {
    if (i%2 === 0) {
      const guess1 = board[guesses[i]];
      const guess2 = board[guesses[i+1]];
      const isPair = guess1 === guess2;
      pairs.push((
        <div
          key={i}
          className={`text-center flex w-10 justify-center h-5 mb-2 ${isPair ? 'ring-2 ring-offset-1 ring-offset-primary ring-primary ring-opacity-100 rounded-full' : ''}`}
        >
          <div className="relative -top-0.5 -rotate-12 left-0.5">{guess1}</div>
          <div className="relative -top-0.5 rotate-12 -left-0.5">{guess2}</div>
        </div>
      ));
    }
    return pairs;
  }, []);
  return (
    <div className={`text-md ${className}`}>
      <div className="tracking-wider text-xl mx-auto text-left">
        <div className="text-center p-2">
          <button disabled={gameIsDone} className={`btn btn-ghost shadow btn-circle btn-lg ${showGuesses && 'btn-active'}`} onClick={toggleShowGuesses}>
            <div className={`${lastRow && !gameIsDone && 'text-red-500'} relative -left-0.5`}>
              <div className="text-xs tracking-normal opacity-50 ml-0.5 normal-case">lives</div>
              <span className="text-2xl ml-1 countdown">
                  <span style={{
                    '--value': MAX_GUESSES - guess_count
                  }} />
                </span>
            </div>
          </button>
        </div>
        <SlideToggle isVisible={showGuesses || gameIsDone} className="py-4 flex justify-center">
          <div className="Guesses height-40 grid grid-rows-4 grid-flow-col gap-x-4 gap-y-1 auto-cols-min">
            {pairs}
          </div>
        </SlideToggle>
      </div>
    </div>
  );
}

export default Guesses;
