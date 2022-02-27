import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import {useHeight} from './hooks';

export default function SlideToggle({ isVisible, startOpen, children, className }) {
  const [height, heightRef] = useHeight();
  const slideInStyles = useSpring({
    config: { ...config.stiff },
    from: {
      opacity: startOpen ? 1 : 0,
      ...!startOpen && {
        height: 0,
      },
    },
    to: {
      opacity: isVisible ? 1 : 0,
      height: isVisible ? height : 0,
    }
  });
  return (
    <animated.div style={{ ...slideInStyles, overflow: 'hidden' }}>
      <div ref={heightRef} className={className}>
        {children}
      </div>
    </animated.div>
  );
}
