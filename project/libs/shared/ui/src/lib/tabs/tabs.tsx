import React, { useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import styles from './tabs.module.scss';
import { motion } from 'framer-motion';
import { IEventForCard } from '@project/shared/types';
import { CardList } from '@project/home-main';

/* eslint-disable-next-line */
export interface ITab {
  id: string | number;
  label?: string;
  content?: IEventForCard[] | null;
}

export interface TabsProps {
  className?: string;
  selectedId?: number;
  tabs: ITab[];
  onClick?: (id: number) => void;
}

const tabVariant = {
  active: {
    width: '55%',
    transition: {
      ease: 'easeInOut',
      type: 'tween',
      duration: 0.4,
    },
  },
  inactive: {
    width: '15%',
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
    <div>
      <ul className={clsx(styles.tabs, className)}>
        {tabs &&
          tabs.map((tab, index) => (
            <motion.li
              className={clsx(styles.tabs__tab, {
                [styles.tabs__tab_selected]: activeTabIndex === index,
              })}
              key={tab.id}
              onClick={() => handleTabClick(index)}
              variants={tabVariant}
              animate={activeTabIndex === index ? 'active' : 'inactive'}
            >
              <span
                className={clsx(styles.tabs__label, {
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
          role={'tabpanel'}
          key={tab.id}
          className={clsx(styles.tabs__content, {
            [styles.tabs__content_selected]: activeTabIndex === index,
          })}
        >
          {tab.content && tab.content.length !== 0 ? (
            <CardList list={tab.content} />
          ) : (
            <p>List is empty</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;