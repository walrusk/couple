import React from 'react';

function Tile({ pos, emoji, className }) {
  return (
    <button className={`Tile btn ${className}`}>
      {pos}
    </button>
  );
}

export default Tile;
