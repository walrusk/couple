import React from 'react';

function Stats({ setShowStats }) {
  return (
    <div>
      <div className="modal modal-open" onClick={() => setShowStats(false)}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Statistics</h3>
          <p className="py-4">
            storing:
            games number with # of moves and time in secs:
            "6": {'{'} m: 18, t:92 }

            x played -> Object.keys(gn).length
            best score: 18
            average score: 30
            best time: 92
            average time: 98
            NEXT COUPLE: (countdown)
            SHARE
          </p>
          {/*<div className="modal-action">*/}
          {/*  <label htmlFor="my-modal" className="btn">CLOSE</label>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}

export default Stats;
