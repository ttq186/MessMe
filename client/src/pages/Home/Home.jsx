import { useEffect } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { WelcomeAnimation } from 'assets/animation';
import { hasLoadWelcomeAnimationVar } from 'cache';

export const Home = () => {
  const navigate = useNavigate();
  const hasLoadWelcomeAnimation = useReactiveVar(hasLoadWelcomeAnimationVar);

  useEffect(() => {
    if (hasLoadWelcomeAnimation) {
      if (document.cookie.includes('logout=0')) {
        navigate('/dashboard');
      } else {
        navigate('/sign-in');
      }
      return;
    }
    const waitForAnimationLoad = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(3000);
    };
    waitForAnimationLoad().then(() => {
      hasLoadWelcomeAnimationVar(true);
    });
  }, [hasLoadWelcomeAnimation, navigate]);

  return (
    <div className='bg-gray-700'>
      <Lottie animationData={WelcomeAnimation} style={{ height: '100vh' }} />
    </div>
  );
};
