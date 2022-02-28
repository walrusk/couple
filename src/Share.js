import React, {useState} from 'react';
import {MAX_GUESSES} from './game-constants';
import { useClipboard } from 'use-clipboard-copy';

function Share({ game }) {
  const { practice, practiceSeed, picks, guess_count, gameNumber } = game;
  const lives = MAX_GUESSES - guess_count;
  const title = practice ? `Practice Couple "${practiceSeed}"` : `Couple #${gameNumber}`;
  const url = 'https://couple.magnetnet.net';
  const text = `${title} ${picks.join(' ')}
Solved with ${lives} ${lives === 1 ? 'life' : 'lives'} left.
${url}`;
  if (!window.navigator.share) {
    return <FallbackShare text={text} title={title} />;
  }
  const share = async () => {
    try {
      await window.navigator.share({ title, text })
    } catch(_) {}
  };
  return (
    <button className="btn btn-sm" onClick={share}>
      share
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    </button>
  );
}

function FallbackShare({ text }) {
  const clipboard = useClipboard();
  const [copied,setCopied] = useState(false);
  function copyButton() {
    setCopied(true);
    clipboard.copy();
  }
  return (
    <div>
      <textarea className="textarea hidden" readOnly ref={clipboard.target} value={text} />
      <div className={`tooltip tooltip-primary ${copied ? 'tooltip-open' : 'tooltip-hidden'}`} data-tip="Copied!">
        <button className="btn btn-sm" onClick={copyButton}>
          share
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Share;
