import React from 'react';
import {useLocalStorageToggle} from './hooks';

function Dev({ clear }) {
  const [daily,dailyToggle] = useLocalStorageToggle('usedaily');
  const swap = () => {
    dailyToggle();
    clear();
    window.location.reload();
  };
  return (
    <div className="mt-20">
      dev:<br />
      <button className="btn btn-ghost btn-xs opacity-50" onClick={clear}>clear</button>
      <br />
      <div className="opacity-50 text-sm flex justify-center mt-2">
        daily <input type="checkbox" onChange={swap} className="toggle toggle-primary mx-2" checked={!daily} /> random
      </div>
    </div>
  );
}

export default Dev;
