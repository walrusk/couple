import React from 'react';
import Share from './Share';

function Guesses({ game, className }) {
  const { guesses, guess_count, board, hasWon } = game;
  return (
    <div className={`text-md ${className}`}>
      {hasWon && (
        <div className="text-center mb-6">
          <div className="win-message text-lg  jello-horizontal uppercase">
            <div className="font-bold">Puzzle Solved! 🎉</div>
          </div>
          <div className="text-sm mt-4 space-x-2">
            <Share game={game} />
          </div>
        </div>
      )}
      <div className="tracking-wider text-xl w-52 mx-auto text-left">
        <div className="my-2 text-center">
          <div className="text-xs tracking-normal opacity-50 ml-0.5">guess</div>
          <span className="text-2xl ml-1 countdown">
            <span style={{
              '--value': guess_count
            }} />
          </span>
        </div>
        <div className="Guesses height-40 grid grid-rows-5 grid-flow-col gap-x-4 auto-cols-min">
          {guesses.reduce((pairs, guess, i) => {
            if (i%2 === 0) {
              const guess1 = board[guesses[i]];
              const guess2 = board[guesses[i+1]];
              const isPair = guess1 === guess2;
              if (!isPair) {
                pairs.push((
                  <div key={i}
                       className={`text-center flex w-10 justify-center h-5 mb-2 opacity-60 ${isPair ? 'ring-2 ring-offset-1 ring-offset-primary ring-primary ring-opacity-100 rounded-full' : ''}`}>
                    <div className="relative -top-0.5 -rotate-12 left-0.5">{guess1}</div>
                    <div className="relative -top-0.5 rotate-12 -left-0.5">{guess2}</div>
                  </div>
                ));
              }
            }
            return pairs;
          }, [])}
        </div>
      </div>
    </div>
  );
}

export default Guesses;
