import React from 'react';
import Share from './Share';
import SlideToggle from './SlideToggle';

function GameOver({ game, className }) {
  const { practice, hasWon, hasLost, clearGame, guess_count } = game;
  return (
    <div className={className}>
      <SlideToggle isVisible={hasWon}>
        <div className="text-center mb-6">
          <div className="win-message text-lg jello-horizontal uppercase">
            Puzzle Solved in <strong>{guess_count}</strong>! 🎉
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
            <div>{practice && <button className="btn mt-2 btn-sm relative -top-0.5" onClick={clearGame}>reset practice</button>}</div>
          </div>
        </div>
      </SlideToggle>
    </div>
  );
}

export default GameOver;
