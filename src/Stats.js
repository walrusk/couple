import React, {useMemo} from 'react';
import Guesses from './Guesses';

function Stats({ guesses, board, className }) {
  const numGuessPairs = Math.floor(guesses.length / 2);
  const hasWon = useMemo(() => winCheck(board, guesses), [board, guesses]);
  return (
    <div className={`Stats text-md ${className}`}>
      {hasWon && (
        <div className="text-center mb-6">
          <div className="win-message text-xl uppercase">
            🎉🎉 <strong className="mx-2">WINNER!</strong> 🎉🎉
          </div>
          <div className="text-sm mt-4 space-x-2">
            {/*<div>Share results?</div>*/}
            {/*<div className="text-xs my-2">*/}
            {/*  <a href="http://walrusk.com/couple/?share=123" target="_blank">http://walrusk.com/couple/?share=...</a>*/}
            {/*</div>*/}
            {/*<button type="button" className="btn btn-xs">copy results</button>*/}
            {/*<button type="button" className="btn btn-xs">see your stats</button>*/}
          </div>
        </div>
      )}
      <div className="tracking-wider text-xl w-52 mx-auto text-left">
        <small className="opacity-50">Reveal all pairs to win!</small>
        <div className="text-sm mb-2 opacity-50 uppercase">
          Guesses:<span className="ml-1 countdown">
          <span style={{
            '--value': numGuessPairs
          }} />
        </span>
        </div>
        <Guesses board={board} guesses={guesses} />
      </div>

    </div>
  );
}

function winCheck(board, guesses) {
  const remaining = [...board];
  for (let i=0; i<guesses.length-1; i+=2) {
    if (board[guesses[i]] === board[guesses[i+1]]) {
      // todo: improve this logic for removing both matches
      let boardIndex = remaining.findIndex((emoji) => emoji === board[guesses[i]]);
      if (boardIndex !== undefined) remaining.splice(boardIndex, 1);
      boardIndex = remaining.findIndex((emoji) => emoji === board[guesses[i]]);
      if (boardIndex !== undefined) remaining.splice(boardIndex, 1);
      if (remaining.length === 0) {
        return true;
      }
    }
  }
  return false;
}

export default Stats;
