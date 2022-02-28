import React, {useEffect, useState} from 'react';
import SlideToggle from './SlideToggle';
import {midnight_secs} from './util';

function Countdown({ game }) {
  const { practice, hasWon, hasLost, refreshToday } = game;
  return (
    <SlideToggle isVisible={!practice && (hasWon || hasLost)}>
      <div className="py-2">
        <TimeRemaining onTimeout={refreshToday} />
      </div>
    </SlideToggle>
  );
}

function TimeRemaining({ onTimeout }) {
  const [t,setT] = useState(0);
  const h = Math.floor(t / 3600);
  const m = Math.floor(t / 60) % 60;
  const s = t % 60;
  useEffect(() => {
    setT(midnight_secs());
    const i = window.setInterval(() => {
      setT((curr_t) => {
        if (curr_t - 1 <= 0) {
          onTimeout?.();
        }
        return curr_t-1;
      });
    }, 1000);
    return () => window.clearInterval(i);
  }, [onTimeout]);
  const countdown = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  const percent = Math.round((t / 86400) * 100);
  return (
    <div className="radial-progress bg-base-300 mt-3" style={{'--value':percent, '--size':'6rem', '--thickness':'4px'}}>
      <div className="text-xs opacity-40">next daily in</div>
      {countdown}
    </div>
  );
}

export default Countdown;
