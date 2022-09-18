import { LazyMotion, domAnimation, m } from "framer-motion";

export const TransitionScale = (props) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div animate={{ scale: [0.8, 1] }} transition={{ duration: 0.5 }}>
        {props.children}
      </m.div>
    </LazyMotion>
  );
};
