import {useEffect, useMemo, useState} from 'react';
import {useComplexLocalStorage} from './hooks';
import {MAX_GUESSES} from './game-constants';

export function useScore(game) {
  const { board, practice, practiceSeed, guesses, guess_count, hasWon, hasLost, gameNumber } = game;
  const [hasSavedGame,setHasSavedGame] = useState(false);
  const [stats,setStats] = useComplexLocalStorage(`stats-${practice ? 'practice' : 'daily'}`, []);
  useEffect(() => {
    if ((hasWon || hasLost) && !hasSavedGame) {
      const gameKey = practice ? practiceSeed : gameNumber
      setStats([
        ...stats.filter((pastGame) => pastGame.k !== gameKey),
        { k: gameKey, gc: guess_count, t: 0, w: hasWon },
      ]);
      setHasSavedGame(true);
    }
  }, [hasWon,hasLost,board,guesses,stats,setStats,hasSavedGame,gameNumber,guess_count,practice,practiceSeed]);
  useEffect(() => {
    if (!hasWon && !hasLost) {
      setHasSavedGame(false);
    }
  }, [hasWon,hasLost]);
  return useMemo(() => calc_score(stats), [stats]);
}

function calc_score(stats) {
  let best_score = 0;
  let sum = 0;
  let best_streak = 0;
  let curr_streak = 0;
  stats.forEach(game => {
    const gcLives = MAX_GUESSES - game.gc;
    // best score
    if (gcLives > best_score) {
      best_score = gcLives;
    }
    // current streak
    if (game.w) {
      curr_streak++;
    } else { // L
      if (curr_streak > best_streak) {
        best_streak = curr_streak;
      }
      curr_streak = 0;
    }
    // average score
    sum += gcLives;
  });
  return {
    best_score,
    avg_score: Math.round(sum / stats.length),
    best_streak: curr_streak > best_streak ? curr_streak : best_streak,
    curr_streak,
    total_games: stats.length,
  };
}
