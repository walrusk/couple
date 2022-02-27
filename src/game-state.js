import {useMemo,useEffect,useState} from 'react';
import {useLocalStorageToggle, useLocalStorage, useComplexLocalStorage} from './hooks';
import seedrandom from 'seedrandom';
import {rand, shuffle} from './util';
import { EMOJIS, W, H, MAX_GUESSES } from './game-constants';

export function useGameState() {
  const [practice,togglePractice,practiceOn,practiceOff] = useLocalStorageToggle('practice');
  const today = useToday();
  const [practiceSeed,setPracticeSeed] = useLocalStorage('practice-seed', 'seed');
  const rng = useMemo(() => practice ? seedrandom(practiceSeed) : seedrandom(today), [practice,practiceSeed,today]);
  const { board, picks } = useMemo(() => gen_board(W, H, EMOJIS, rng), [rng]);
  const [guesses,setGuessList] = useComplexLocalStorage(`guesses-${practice ? 'practice' : 'daily'}`, []);
  const hasWon = useMemo(() => check_win(board, guesses), [board,guesses]);
  const clearGame = () => { if (practice) setGuessList([]) };
  const dailyGuessesFor = window.localStorage.getItem('daily-guesses-for');
  const guess_count = count_guesses(board, guesses);
  const hasLost = !hasWon && guess_count >= MAX_GUESSES;
  useEffect(() => {
    if (dailyGuessesFor !== today && !practice) {
      setGuessList([]);
    }
  }, [dailyGuessesFor,today,practice,setGuessList]);
  return {
    board,
    picks,
    guesses,
    guess_count,
    practice,
    gameNumber: game_days(today),
    practiceSeed,
    setPracticeSeed: (seed) => { setPracticeSeed(seed); clearGame(); },
    randomPracticeSeed: () => { setPracticeSeed(rand(1,999, Math.random).toString().padStart(3, '0')); clearGame(); },
    hasWon,
    hasLost,
    makeGuess: (pos) => {
      if (!hasLost) {
        setGuessList([...guesses, pos]);
        window.localStorage.setItem('daily-guesses-for', local_today());
      }
    },
    clearGame,
    togglePractice,
    practiceOn,
    practiceOff,
    isPaired: (pos) => is_paired(board, guesses, pos),
  };
}

function useToday() {
  const [today,setToday] = useState(local_today());
  useEffect(() => {
    const i = setInterval(() => setToday(local_today()), 60000);
    return () => window.clearInterval(i);
  }, []);
  return today;
}

function gen_board(w, h, emojis, rng) {
  const picks = rand_emojis(w * h / 2, emojis, rng);
  return {
    board: shuffle([...picks,...picks], rng),
    picks,
  };
}

function rand_emojis(num, from_emojis, rng) {
  const emojis = [];
  let from = [...from_emojis];
  for (let i=0; i<num; i++) {
    const pos = rand(0, from.length - 1, rng);
    const emoji = from[pos];
    emojis.push(emoji);
    from.splice(pos, 1);
  }
  return emojis;
}

function is_paired(board, guesses, pos) {
  for (let i=0; i<guesses.length-1; i+=2) {
    if (board[guesses[i]] === board[guesses[i+1]] && board[guesses[i]] === board[pos]) {
      return true;
    }
  }
}

function count_guesses(board, guesses) {
  return Math.floor(guesses.length / 2) - count_pairs(board, guesses);
}

function count_pairs(board, guesses) {
  let pairs = 0;
  for (let i=0; i<guesses.length-1; i+=2) {
    if (board[guesses[i]] === board[guesses[i+1]]) {
      pairs++;
    }
  }
  return pairs;
}

function check_win(board, guesses) {
  const remaining = [...board];
  for (let i=0; i<guesses.length-1; i+=2) {
    if (board[guesses[i]] === board[guesses[i+1]]) {
      // todo: improve this logic for removing both matches
      let boardIndex = remaining.findIndex((emoji) => emoji === board[guesses[i]]);
      if (boardIndex !== undefined) remaining.splice(boardIndex, 1);
      boardIndex = remaining.findIndex((emoji) => emoji === board[guesses[i]]);
      if (boardIndex !== undefined) remaining.splice(boardIndex, 1);
      if (remaining.length === 0) {
        return true;
      }
    }
  }
  return false;
}

function game_days(today) {
  const diff = new Date(today).getTime() - new Date('2022-02-25');
  return Math.ceil(diff / (1000 * 3600 * 24));
}

function padNum(n) {
  return n.toString().padStart(2, '0');
}

function local_today() {
  const d = new Date();
  return `${d.getFullYear()}-${padNum(d.getMonth()+1)}-${padNum(d.getDate())}`;
}
