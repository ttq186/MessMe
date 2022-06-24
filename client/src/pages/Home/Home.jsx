import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useReactiveVar } from '@apollo/client';

import { WelcomeAnimation } from 'assets/animation';
import { hasLoadWelcomeAnimationVar } from 'cache';

export const Home = () => {
  const navigate = useNavigate();
  const hasLoadWelcomeAnimation = useReactiveVar(hasLoadWelcomeAnimationVar);

  useEffect(() => {
    if (hasLoadWelcomeAnimation) {
      navigate('/sign-in');
    }
    const waitForAnimationLoad = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(3000);
    };
    waitForAnimationLoad().then(() => {
      hasLoadWelcomeAnimationVar(true);
    });
  }, [hasLoadWelcomeAnimation]);

  return (
    <div className='bg-slate-700'>
      <Lottie animationData={WelcomeAnimation} style={{ height: '100vh' }} />
    </div>
  );
};
