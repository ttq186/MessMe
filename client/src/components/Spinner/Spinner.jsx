import { LazyMotion, domAnimation, m } from 'framer-motion';

export const Spinner = () => {
  const spinnerTransition = {
    repeat: Infinity,
    ease: 'linear',
    duration: 1,
  };

  return (
    <div className='fixed flex items-center justify-center -top-12 right-0 left-0 bottom-0 bg-gray-700 text-slate-100'>
      <LazyMotion features={domAnimation}>
        <m.span
          animate={{ rotate: 360 }}
          transition={spinnerTransition}
          className='w-16 h-16 border-[4px] border-slate-400 border-t-slate-200 rounded-full'
        ></m.span>
      </LazyMotion>
    </div>
  );
};
