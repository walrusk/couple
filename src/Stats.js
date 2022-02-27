import React, {useEffect,useState,useMemo} from 'react';
import {useComplexLocalStorage} from './hooks';

function Stats({ game, setShowStats }) {
  const { best_score, avg_score, best_streak, curr_streak } = useScore(game);
  return (
    <div className="scale-in-ver-top pt-4">
      <div className="text-right h-0 relative top-10 -right-6">
        <button className="btn btn-ghost btn-circle btn-sm opacity-50" onClick={() => setShowStats(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
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
        {/*NEXT COUPLE: (countdown)*/}
      </div>
    </div>
  );
}

function useScore(game) {
  const { board, practice, practiceSeed, guesses, guess_count, hasWon, gameNumber } = game;
  const [hasSavedWin,setHasSavedWin] = useState(false);
  const [stats,setStats] = useComplexLocalStorage(`stats-${practice ? 'practice' : 'daily'}`, {});
  useEffect(() => {
    if (hasWon && !hasSavedWin) {
      setStats({
        ...stats,
        [practice ? practiceSeed : gameNumber]: { g: guess_count, t: 0 },
      });
      setHasSavedWin(true);
    }
  }, [hasWon,board,guesses,stats,setStats,hasSavedWin,gameNumber,guess_count,practice,practiceSeed]);
  useEffect(() => {
    if (!hasWon) {
      setHasSavedWin(false);
    }
  }, [hasWon]);
  return useMemo(() => {
    // calc score from stats
    return {
      // ...stats,
      best_score: 12,
      avg_score: 16,
      best_streak: 5,
      curr_streak: 3,
    };
  }, [stats]);
}

export default Stats;
