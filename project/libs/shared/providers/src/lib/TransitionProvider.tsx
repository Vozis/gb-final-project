import React, { FC, PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.5,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25,
    },
  },
};

export const TransitionProvider: FC<
  PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, className }) => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence initial={false} mode={'wait'}>
      <motion.main
        className={className}
        key={pathname}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};
