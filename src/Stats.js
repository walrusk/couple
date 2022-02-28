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
        <div className="pt-6 text-xs flex justify-center items-center flex-nowrap space-x-0.5">
          <span className="opacity-30">feedback</span>
          <a href="mailto:&#114;&#116;&#110;&#111;&#111;&#100;&#101;&#108;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;?subject=Couple%20Feedback&body=Hi%20RT!%0D%0A" className="link opacity-30 hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a href="https://twitter.com/rtnoodel" target="_blank" rel="noreferrer" className="link opacity-30 hover:opacity-100">
            <svg viewBox="328 355 335 276" className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="
    M 630, 425
    A 195, 195 0 0 1 331, 600
    A 142, 142 0 0 0 428, 570
    A  70,  70 0 0 1 370, 523
    A  70,  70 0 0 0 401, 521
    A  70,  70 0 0 1 344, 455
    A  70,  70 0 0 0 372, 460
    A  70,  70 0 0 1 354, 370
    A 195, 195 0 0 0 495, 442
    A  67,  67 0 0 1 611, 380
    A 117, 117 0 0 0 654, 363
    A  65,  65 0 0 1 623, 401
    A 117, 117 0 0 0 662, 390
    A  65,  65 0 0 1 630, 425
    Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Stats;
