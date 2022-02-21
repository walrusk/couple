import React from 'react';
import Tile from './Tile';
import {gen_board} from './gen';
import {range} from './util';

const w = 4;
const h = 4;
const board = gen_board(w, h, true);

console.log(board);

function Game(props) {
  return (
    <div className="container mx-auto p-6">
      {range(1,h).map((_,y) => (
        <div className="Row flex space-x-2 justify-center">
          {range(1,w).map((_,x) => {
            const pos = y*x+x;
            return (
              <Tile
                pos={pos}
                emoji={board[pos]}
                className="w-12 h-10 flex justify-center items-center mb-2"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Game;


// {(new Array(h)).map((_,x) => {
//   const pos = y*x+x;
//   return <Tile pos={pos} emoji={board[pos]} />
// })}