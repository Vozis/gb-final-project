import React from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import styles from './tabs.module.scss';

/* eslint-disable-next-line */
export interface ITab {
  id: string;
  label?: string;
}

export interface TabsProps {
  className?: string;
  selectedId: string;
  tabs: ITab[];
  onClick: (id: string) => void;
}

export const Tabs: FC<TabsProps> = ({
  className,
  selectedId,
  tabs,
  onClick,
}) => {
  return (
    <div className={clsx(styles.tabs, className)}>
      {tabs &&
        tabs.map(tab => (
          <div
            className={clsx(styles.tabs__tab, {
              [styles.tabs__tab_selected]: tab.id === selectedId,
            })}
            key={tab.id}
            onClick={() => onClick(tab.id)}
          >
            <div
              className={clsx(styles.tabs__label, {
                [styles.tabs__label_selected]: tab.id === selectedId,
              })}
            >
              {tab.label}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tabs;
