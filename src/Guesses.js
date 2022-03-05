import React, {useState} from 'react';
import {MAX_GUESSES} from './game-constants';
import SlideToggle from './SlideToggle';
import {range} from './util';

function Guesses({ game, className }) {
  const { hasWon, hasLost, guesses, guess_count, board } = game;
  const lastRow = guess_count > MAX_GUESSES - 4;
  const [showGuesses,setShowGuesses] = useState(false);
  const gameIsDone = hasWon || hasLost;
  const pairs = guesses.reduce((pairs, guess, i) => {
    if (i%2 === 0) {
      const guess1 = board[guesses[i]];
      const guess2 = board[guesses[i+1]];
      const isPair = guess1 === guess2;
      if (!isPair) {
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
    }
    return pairs;
  }, []);
  return (
    <div className={`text-md ${className}`}>
      <div className="tracking-wider text-xl w-52 mx-auto text-left">
        <SlideToggle isVisible={!gameIsDone}>
          <div className="text-center py-2">
            <button className={`btn btn-ghost shadow btn-circle btn-lg ${showGuesses && 'btn-active'}`} onClick={() => setShowGuesses(!showGuesses)}>
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
        </SlideToggle>
        <SlideToggle isVisible={showGuesses || gameIsDone} className="py-4">
          <div className="Guesses height-40 grid grid-rows-4 grid-flow-col gap-x-4 auto-cols-min">
            {pairs}
            {range(guess_count + 1, MAX_GUESSES).map((i) => (
              <div
                key={i}
                className="flex justify-center items-center w-10"
              >
                <div className="bg-base-300 w-7 h-7 mb-2 opacity-80 rounded-full relative -top-1" />
              </div>
            ))}
          </div>
        </SlideToggle>
      </div>
    </div>
  );
}

export default Guesses;
