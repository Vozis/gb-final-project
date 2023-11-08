import type { FC } from 'react';
import React, { ReactElement, useState } from 'react';
import cn from 'clsx';
import styles from './tabs.module.scss';
import { motion } from 'framer-motion';

/* eslint-disable-next-line */
export interface ITab {
  id: string | number;
  label?: string;
  content?: ReactElement<any>;
  className?: string;
}

export interface TabsProps {
  className?: string;
  selectedId?: number;
  tabs: ITab[];
  onClick?: (id: number) => void;
}

const tabVariant = {
  active: {
    width: '60%',
    transition: {
      ease: 'easeInOut',
      type: 'tween',
      duration: 0.4,
    },
  },
  inactive: {
    width: '30%',
    transition: {
      ease: 'easeInOut',
      type: 'tween',
      duration: 0.4,
    },
  },
};

export const Tabs: FC<TabsProps> = ({ className, selectedId = 0, tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(selectedId);

  const handleTabClick = (id: number) => {
    setActiveTabIndex(id);
  };

  return (
    <>
      <ul className={cn(styles.tabs, [className])}>
        {tabs &&
          tabs.map((tab, index) => (
            <motion.li
              className={cn(styles.tabs__tab, {
                [styles.tabs__tab_selected]: activeTabIndex === index,
              })}
              key={tab.id}
              onClick={() => handleTabClick(index)}
              variants={tabVariant}
              animate={activeTabIndex === index ? 'active' : 'inactive'}
            >
              <span
                className={cn(styles.tabs__label, {
                  [styles.tabs__label_selected]: activeTabIndex === index,
                })}
              >
                {tab.label}
              </span>
            </motion.li>
          ))}
      </ul>
      {tabs.map((tab, index) => (
        <div
          role={'tabPanel'}
          key={tab.id}
          className={cn(styles.tabs__content, {
            [styles.tabs__content_selected]: activeTabIndex === index,
          })}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
};

export default Tabs;
