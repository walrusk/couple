import React from 'react';
import seedrandom from 'seedrandom';
import {rand} from './util';

function Practice({ game }) {
  const { picks, practiceSeed, setPracticeSeed } = game;
  const rng = seedrandom(practiceSeed);
  return (
    <label>
      <div>
        <input
          type="text"
          className="input bg-base-300 input-lg w-28 text-center h-10 leading-none"
          value={practiceSeed}
          onChange={(evt) => setPracticeSeed(evt.target.value)}
        />
      </div>
      <div className="flex -space-x-0.5 justify-center text-lg emoji-seed-demo">
        {picks.map((emoji) => {
          const tiltL = rand(0, 1, rng) === 0;
          return (
            <div key={emoji} className={`relative -top-2 ${tiltL ? '-' : ''}rotate-12`}>{emoji}</div>
          );
        })}
      </div>
    </label>
  );
}

export default Practice;
