import React from 'react';
import {useLocalStorageToggle} from './hooks';

function Practice() {
  const [practice] = useLocalStorageToggle('practice');
  if (!practice) {
    return null;
  }
  return (
    <div>
      <label className="input-group input-group-xs">
        <span>game</span>
        <input type="text" className="input input-bordered input-xs" />
      </label>
    </div>
  );
}

export default Practice;
