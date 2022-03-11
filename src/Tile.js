import React from 'react';

function Tile({ emoji, className, onClick, revealed, paired }) {
  return (
    <div className={`swap swap-flip ${revealed && 'swap-active'}`}>
      <span className="swap-on">
        <button className={`Tile btn disabled cursor-default ${className} ${paired && 'btn-primary'}`}>
          {revealed && emoji}
        </button>
      </span>
      <span className="swap-off">
        <button className={`Tile btn ${className}`} onClick={onClick} />
      </span>
    </div>
  );
}

export default Tile;
