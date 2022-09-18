import { LazyMotion, domAnimation, m } from "framer-motion";

export const TransitionSlide = (props) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate={{ y: [20, 0] }}
        transition={{ duration: 0.5 }}
        className="w-[89%]"
      >
        {props.children}
      </m.div>
    </LazyMotion>
  );
};
