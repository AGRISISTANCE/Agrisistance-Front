import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './LogoReveal.json';

const Preloader: React.FC<{ onAnimationComplete: () => void }> = ({ onAnimationComplete }) => {
  const [isStopped, setIsStopped] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    const audio = new Audio('./sound.mp3');
    audio.play();

    const animationDuration = (82 / 25) * 1000; // 82 frames at 25 fps
    const timer = setTimeout(() => {
      setIsStopped(true);
      onAnimationComplete();
    }, animationDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [onAnimationComplete]);

  return (
    <div>
      {!isStopped && <Lottie options={defaultOptions} />}
    </div>
  );
};

export default Preloader;
