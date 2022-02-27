import React from 'react';
import {useScore} from './game-score';

function Stats({ game, setShowStats }) {
  const { practice } = game;
  const { best_score, avg_score, best_streak, curr_streak, total_games } = useScore(game);
  return (
    <div className="py-4">
      <div className="pt-2 pb-4 text-center relative bg-base-200 rounded-xl">
        <h3 className="mt-2">
          {practice ? 'Practice ' : ''} Stats
          <button className="btn btn-ghost btn-circle btn-sm opacity-50 absolute right-2" onClick={() => setShowStats(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </h3>
        <div className="text-center flex flex-col">
          <div className="flex space-x-4 mx-auto">
            <div className="my-2 text-center">
              <div className="text-xs tracking-normal opacity-50 ml-0.5">best score</div>
              <span className="text-2xl ml-1 countdown">
                <span style={{
                  '--value': best_score
                }} />
              </span>
            </div>
            <div className="my-2 text-center">
              <div className="text-xs tracking-normal opacity-50 ml-0.5">average score</div>
              <span className="text-2xl ml-1 countdown">
                <span style={{
                  '--value': avg_score
                }} />
              </span>
            </div>
          </div>
          <div className="flex space-x-4 mx-auto">
            <div className="my-2 text-center">
              <div className="text-xs tracking-normal opacity-50 ml-0.5">best streak</div>
              <span className="text-2xl ml-1 countdown">
                <span style={{
                  '--value': best_streak
                }} />
              </span>
            </div>
            <div className="my-2 text-center">
              <div className="text-xs tracking-normal opacity-50 ml-0.5">current streak</div>
              <span className="text-2xl ml-1 countdown">
                <span style={{
                  '--value': curr_streak
                }} />
              </span>
            </div>
          </div>
          <div className="flex space-x-4 mx-auto">
            <div className="my-2 text-center">
              <div className="text-xs tracking-normal opacity-50 ml-0.5">total played</div>
              <span className="text-2xl ml-1 countdown">
                <span style={{
                  '--value': total_games
                }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
