import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import animationData from './logoReveal.json';

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
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
      <audio ref={audioRef} src="./sound.mp3" autoPlay />
    </div>
  );
};

export default Preload;
