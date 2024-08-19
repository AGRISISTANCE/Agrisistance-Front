import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import animationData from './LogoReveal.json';
import { AnimationWrapper } from './styles'; // Import the styled component

const Preload: React.FC<{ onAnimationComplete: () => void }> = ({ onAnimationComplete }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Error playing sound:", error);
        });
      }
    };

    playAudio();

    setTimeout(() => {
      onAnimationComplete();
    }, (animationData.op / animationData.fr) * 1000); // Duration of the animation in milliseconds
  }, [onAnimationComplete]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <AnimationWrapper>
      <Lottie options={defaultOptions} height={window.innerHeight} width={window.innerWidth} />
      <audio ref={audioRef} src="./sound.mp3" autoPlay />
    </AnimationWrapper>
  );
};

export default Preload;
