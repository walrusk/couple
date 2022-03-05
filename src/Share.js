import React from 'react';
// import {MAX_GUESSES} from './game-constants';
import ShareFallback from './ShareFallback'

function Share({ game, statsButton, className }) {
  const { guesses, board, practice, practiceSeed, gameNumber } = game;
  // const lives = MAX_GUESSES - guess_count;
  const numGuesses = Math.floor(guesses.length / 2);
  const title = practice ? `Practice Couple "${practiceSeed}"` : `Couple #${gameNumber}`;
  // const url = 'https://couple.magnetnet.net';
  const text = `${title}
${columns(pairedEmojis(guesses, board))}
Solved in ${numGuesses} guesses.`;
//Solved with ${lives} ${lives === 1 ? 'life' : 'lives'} left.`;
  if (!window.navigator.share) {
    return (
      <ShareFallback
        text={text}
        statsButton={statsButton}
        className={className}
      />
    );
  }
  const share = async () => {
    try {
      await window.navigator.share({ title, text })
    } catch(_) {}
  };
  return (
    <div className={className}>
      <button className="btn btn-sm" onClick={share}>
        share
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
      {statsButton}
    </div>
  );
}

function pairedEmojis(guesses, board) {
  const pairs = [];
  for (let i=0; i<guesses.length; i+=2) {
    const g1 = board[guesses[i]];
    const g2 = board[guesses[i+1]];
    pairs.push(`${g1}${g2}`);
  }
  return pairs;
}

function columns(emojis, numCols = 3) {
  const rows = [];
  let rowI = 0;
  emojis.forEach((e) => {
    if (!rows[rowI]) rows[rowI] = '';
    rows[rowI] += `${e}        `;
    rowI++;
    if (rowI > emojis.length / numCols) {
      rowI = 0;
    }
  });
  return rows.map((r) => r.trim()).join('\n');
}

export default Share;
