import {useClipboard} from 'use-clipboard-copy';
import React, {useState} from 'react';
import SlideToggle from './SlideToggle';

function ShareFallback({ text, statsButton, className }) {
  const [copied,setCopied] = useState(false);
  const [copyErr,setCopyErr] = useState('');
  const [showCopyText,setShowCopyText] = useState(false);
  const clipboard = useClipboard({
    onSuccess() {
      setCopied(true);
    },
    onError() {
      setCopyErr('unable to copy');
    }
  });
  function copyButton() {
    clipboard.copy();
    setCopied(true);
    setShowCopyText(true);
    window.setTimeout(() => setCopied(false), 5000);
  }
  return (
    <>
      <div className={className}>
        <div className={`tooltip tooltip-primary ${copied || copyErr ? 'tooltip-open' : 'tooltip-hidden'}`} data-tip={copyErr ? copyErr : 'Copied!'}>
          <button className="btn btn-sm" onClick={copyButton}>
            share
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
        {statsButton}
      </div>
      <SlideToggle isVisible={!!copyErr || showCopyText}>
        <textarea className="textarea textarea-bordered bg-base-200 w-56 h-40 leading-tight" readOnly ref={clipboard.target} value={text} />
      </SlideToggle>
    </>
  );
}

export default ShareFallback;
