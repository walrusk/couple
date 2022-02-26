import {useLocalStorageToggle, useLocalStorage, useComplexLocalStorage} from './hooks';
import seedrandom from 'seedrandom';
import {useMemo} from 'react';
import {rand, shuffle} from './util';

const EMOJIS = ['🗿','5️⃣','❎','💝','↕️','😨','♿️','🕳','📱','🐨','🈯️','🗳','🎥','🚭','🔧','🌒','💭','🚊','👀','😢'];

export function useGameState() {
  const [practice,practiceToggle] = useLocalStorageToggle('practice');
  const today = new Date().toISOString().slice(0, 10);
  const practiceSeed = useLocalStorage('practice-seed');
  const rng = useMemo(() => practice ? seedrandom(practiceSeed) : seedrandom(today), [practice,practiceSeed,today]);

  const [guesses,setGuessList] = useComplexLocalStorage(`guesses-${practice ? 'practice' : 'daily'}`, []);
  const guess = (pos) => { setGuessList([ ...guesses, pos ]) };
  const clear = () => { if (practice) setGuessList([]); };

}

function gen_board(w, h, emojis, rng) {
  const picks = rand_emojis(w * h / 2, emojis, rng);
  return shuffle([...picks,...picks], rng);
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
