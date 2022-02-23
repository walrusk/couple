import React from 'react';

function Guesses({ board, guesses }) {
  return (
    <div className="Guesses height-40 grid grid-rows-5 grid-flow-col gap-x-4 auto-cols-min">
      {guesses.reduce((pairs, guess, i) => {
        if (i%2 === 0) {
          const guess1 = board[guesses[i]];
          const guess2 = board[guesses[i+1]];
          const isPair = guess1 === guess2;
          pairs.push((
            <div key={i} className={`text-center flex w-10 justify-center h-5 mb-2 ${isPair ? 'ring-2 ring-offset-1 ring-offset-primary ring-primary ring-opacity-100 rounded-full' : 'opacity-40'}`}>
              <div className="relative -top-0.5 -rotate-12 left-0.5">{guess1}</div>
              <div className="relative -top-0.5 rotate-12 -left-0.5">{guess2}</div>
            </div>
          ));
        }
        return pairs;
      }, [])}
    </div>
  );
}

export default Guesses;
