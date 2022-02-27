import React, {useEffect, useState} from 'react';
import Share from './Share';
import SlideToggle from './SlideToggle';
import {midnight_secs} from './util';

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
      <div className="py-2">
        <SlideToggle isVisible={hasWon || hasLost}>
          <TimeRemaining />
          <div className="text-xs opacity-40">until next puzzle available</div>
        </SlideToggle>
      </div>
    </div>
  );
}

function TimeRemaining() {
  const [t,setT] = useState(0);
  const h = Math.floor(t / 3600);
  const m = Math.floor(t / 60) % 60;
  const s = t % 60;
  useEffect(() => {
    setT(midnight_secs());
    const i = window.setInterval(() => {
      setT((curr_t) => curr_t-1);
    }, 1000);
    return () => window.clearInterval(i);
  }, []);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default GameOver;
