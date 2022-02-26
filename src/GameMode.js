import React from 'react';
import {useLocalStorageToggle} from './hooks';

function GameMode() {
  const [practice,practiceToggle] = useLocalStorageToggle('practice');
  const swap = () => {
    practiceToggle();
    window.location.reload();
  };
  return (
    <div className="btn-group relative top-0.5">
      <button className={`btn btn-xs ${!practice && 'btn-active'}`} onClick={swap}>Daily</button>
      <button className={`btn btn-xs ${practice && 'btn-active'}`} onClick={swap}>Practice</button>
    </div>
  );
}

export default GameMode;
