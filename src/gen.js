import seedrandom from 'seedrandom';
import {rand,shuffle} from './util';

const emoji_tray = ['🗿','5️⃣','❎','💝','↕️','😨','♿️','🕳','📱','🐨','🈯️','🗳','🎥','🚭','🔧','🌒','💭','🚊','👀','😢'];
const rng = seedrandom('test');

export function gen_board(w, h) {
  const half_board_size = w * h / 2;

  // pick random emojis
  const emojis = rand_emojis(half_board_size-1, emoji_tray);
  const board = shuffle([...emojis,...emojis,'💀','💀'], rng);

  return board;
}

function rand_emojis(num, from_emojis) {
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
