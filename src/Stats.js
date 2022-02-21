import React from 'react';

function Stats({ guesses, board, className }) {
  const numGuessPairs = Math.floor(guesses.length / 2);
  return (
    <div className={`text-md uppercase ${className}`}>
      <div className="tracking-wider">
        {extraGuesses(board, guesses).map(pos => board[pos])}
      </div>
      <div className="text-xs">
        Guess pairs:<span className="ml-1 countdown">
          <span style={{
            '--value': numGuessPairs
          }} />
        </span>
      </div>
    </div>
  );
}

function extraGuesses(board, guesses) {
  const extra = [];
  for (let i=0; i<guesses.length-1; i+=2) {
    if (board[guesses[i]] !== board[guesses[i+1]]) {
      extra.push(guesses[i], guesses[i+1]);
    }
  }
  return extra;
}

export default Stats;
