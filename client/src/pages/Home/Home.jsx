import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import { WelcomeAnimation } from 'assets/animation';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/sign-in'), 3000);
  }, []);

  return (
    <Lottie animationData={WelcomeAnimation} style={{ height: '100vh' }} />
  );
};
