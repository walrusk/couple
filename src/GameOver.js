import React, {useState,useEffect} from 'react';
import Share from './Share';
import SlideToggle from './SlideToggle';

function GameOver({ game, className, showStats, setShowStats }) {
  const { practice, hasWon, guesses, hasLost, clearGame } = game;
  const numGuesses = Math.floor(guesses.length / 2);
  const [showGuy,setShowGuy] = useState(false);
  const briefGuy = () => {
    setShowGuy(true);
    window.setTimeout(() => setShowGuy(false), 0);
  };
  useEffect(() => {
    briefGuy();
  },[]);
  return (
    <div className={className}>
      <SlideToggle isVisible={hasWon}>
        <div className="text-center pb-2">
          <div className="win-message text-lg jello-horizontal">
            <div className={`uppercase font-bold z-10 relative ${showGuy && '-mb-4'}`}>Puzzle Solved <span className="relative top-px">✅</span></div>
            <div className="flex justify-center">
              <SlideToggle isVisible={showGuy}>
                <div className="whitespace-pre-wrap relative px-4 pb-2 pt-10 pb-6 -my-10">
                  <div className="bg-primary rounded-full w-24 h-24 opacity-80 absolute left-2 shadow-xl" />
                  <div className="relative leading-tight relative -left-3.5 top-4">
                    {`     😎
     👈 2️⃣ 👈
      👟👟`}
                  </div>
                </div>
              </SlideToggle>
            </div>
            <SlideToggle isVisible={!showGuy}>
              <div>
                <div className="opacity-80 text-sm relative -mt-3 py-2 flex justify-center items-center space-x-1">
                  <span className="text-sm">in</span>
                  <strong className="text-xl font-bold">{numGuesses}</strong>
                  <span className="text-sm">guesses! 🎉</span>
                </div>
                {/*<div className="opacity-80 text-sm relative -mt-3 py-2 flex justify-center items-center space-x-1">*/}
                {/*  <span className="text-sm">({lives} {lives === 1 ? 'life' : 'lives'} left)</span>*/}
                {/*</div>*/}
              </div>
            </SlideToggle>
          </div>
          <Share game={game} className="text-sm my-2 flex justify-center space-x-4" statsButton={(
            <button className={`btn btn-sm ${showStats && 'btn-active'}`} onClick={() => setShowStats(!showStats)}>
              stats
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          )} />
        </div>
      </SlideToggle>
      <SlideToggle isVisible={hasLost}>
        <div className="text-center mb-6">
          <div className="win-message text-lg shake-horizontal uppercase font-bold">
            Game Over
            <div>{practice && <button className="btn mt-2 btn-sm relative -top-0.5" onClick={clearGame}>reset practice</button>}</div>
          </div>
        </div>
      </SlideToggle>
    </div>
  );
}

export default GameOver;
