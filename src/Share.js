import React from 'react';

function Share({ game }) {
  if (!window.navigator.share) {
    return null;
  }
  const { picks, guesses, gameNumber } = game;
  const numGuessPairs = Math.floor(guesses.length / 2);
  const shareString = `COUPLE #${gameNumber} ${picks}
Won in ${numGuessPairs} guesses.`;
  const share = async () => {
    try {
      await window.navigator.share({
        title: `COUPLE #${gameNumber}`,
        text: shareString,
        url: 'http://walrusk.com/couple',
      })
    } catch(_) {}
  };
  return (
    <div>
      <button className="btn btn-sm" onClick={share}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
    </div>
  );
}

export default Share;
