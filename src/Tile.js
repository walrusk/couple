import React from 'react';

function Tile({ pos, emoji, className, onClick, revealed, paired }) {
  return (
    <button className={`Tile btn ${className} ${paired && 'btn-primary'}`} onClick={onClick}>
      {revealed ? emoji : ''}
    </button>
  );
}

export default Tile;
