import React from 'react';
import Share from './Share';
import SlideToggle from './SlideToggle';

function GameOver({ game, className }) {
  const { practice, hasWon, hasLost, clearGame } = game;
  return (
    <div className={className}>
      <SlideToggle isVisible={hasWon}>
        <div className="text-center mb-6">
          <div className="win-message text-lg jello-horizontal uppercase font-bold">
            Puzzle Solved! 🎉
          </div>
          <div className="text-sm mt-4 space-x-2">
            <Share game={game} />
          </div>
        </div>
      </SlideToggle>
      <SlideToggle isVisible={hasLost}>
        <div className="text-center mb-6">
          <div className="win-message text-lg shake-horizontal uppercase font-bold">
            Game Over
            {practice && <button className="btn btn-xs ml-6 relative -top-0.5" onClick={clearGame}>reset</button>}
          </div>
        </div>
      </SlideToggle>
    </div>
  );
}

export default GameOver;
