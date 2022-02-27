import React, {useState} from 'react';
import Tile from './Tile';
import { range } from './util';
import Guesses from './Guesses';
import PracticeSeed from './PracticeSeed';
import { W, H } from './game-constants';
import GameOver from './GameOver';
import Countdown from './Countdown';

let guessTimeout;

function Game({ game }) {
  const { board, guesses, hasWon, hasLost, gameNumber, makeGuess, practice, isPaired } = game;
  const [justGuessed,setJustGuessed] = useState();
  const guess = (pos) => {
    if (!hasLost) {
      guessTimeout && window.clearTimeout(guessTimeout);
      if (guesses[guesses.length - 1] !== pos) {
        makeGuess(pos);
        setJustGuessed(pos);
        guessTimeout = window.setTimeout(() => setJustGuessed(undefined), 1000);
      }
    }
  };
  return (
    <div className="Game container mx-auto p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        {practice ? (
          <PracticeSeed game={game} />
        ) : (
          <div className="text-sm opacity-75">
            game #{gameNumber}
          </div>
        )}
      </div>
      <GameOver game={game} className="my-4" />
      <div className="">
        {range(0,H-1).map((y) => (
          <div className="Row flex space-x-2 justify-center" key={y}>
            {range(0,W-1).map((x) => {
              const pos = y*H+x;
              const wasJustGuessed = pos === justGuessed;
              const isActiveGuess = guesses.length % 2 === 1 && guesses[guesses.length - 1] === pos;
              const wasJustActiveGuess = guesses.length % 2 === 0 && justGuessed !== undefined && guesses[guesses.length - 2] === pos;
              const hasBeenPaired = isPaired(pos);
              return (
                <Tile
                  key={pos}
                  pos={pos}
                  onClick={() => guess(pos)}
                  revealed={wasJustGuessed || isActiveGuess || wasJustActiveGuess || hasBeenPaired}
                  paired={hasBeenPaired}
                  emoji={board[pos]}
                  className={`w-12 h-10 flex justify-center items-center mb-2 text-2xl ${hasWon && 'jello-diagonal-1'} ${hasLost && 'puff-out-center'}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <Countdown game={game} />
      <Guesses game={game} />
    </div>
  );
}

export default Game;
