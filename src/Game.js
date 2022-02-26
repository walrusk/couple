import React, {useState} from 'react';
import Tile from './Tile';
import {gen_board} from './gen';
import {range} from './util';
import {useComplexLocalStorage, useLocalStorageToggle} from './hooks';
import Stats from './Stats';
import Practice from './Practice';

const w = 4;
const h = 4;
const board = gen_board(w, h, true);

// console.log(board);

let guessTimeout;

function Game() {
  const [guesses,saveGuess,clear] = useGuessList();
  const [justGuessed,setJustGuessed] = useState();
  const guess = (pos) => {
    guessTimeout && window.clearTimeout(guessTimeout);
    if (guesses[guesses.length - 1] !== pos) {
      saveGuess(pos);
      setJustGuessed(pos);
      guessTimeout = window.setTimeout(() => setJustGuessed(undefined), 1000);
    }
  };
  return (
    <div className="Game container mx-auto p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <Practice />
      </div>
      <div className="">
        {range(0,h-1).map((y) => (
          <div className="Row flex space-x-2 justify-center" key={y}>
            {range(0,w-1).map((x) => {
              const pos = y*h+x;
              const wasJustGuessed = pos === justGuessed;
              const isActiveGuess = guesses.length % 2 === 1 && guesses[guesses.length - 1] === pos;
              const wasJustActiveGuess = guesses.length % 2 === 0 && justGuessed !== undefined && guesses[guesses.length - 2] === pos;
              const hasBeenPaired = isPaired(board, guesses, pos);
              return (
                <Tile
                  key={pos}
                  pos={pos}
                  onClick={() => guess(pos)}
                  revealed={wasJustGuessed || isActiveGuess || wasJustActiveGuess || hasBeenPaired}
                  paired={hasBeenPaired}
                  emoji={board[pos]}
                  className="w-12 h-10 flex justify-center items-center mb-2 text-2xl"
                />
              );
            })}
          </div>
        ))}
      </div>
      <Stats guesses={guesses} board={board} className="mt-4" />
    </div>
  );
}

function isPaired(board, guesses, pos) {
  for (let i=0; i<guesses.length-1; i+=2) {
    if (board[guesses[i]] === board[guesses[i+1]] && board[guesses[i]] === board[pos]) {
      return true;
    }
  }
}

export default Game;
