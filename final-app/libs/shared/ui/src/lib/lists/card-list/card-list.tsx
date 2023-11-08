import { IEventForCard } from '@project/shared/types';
import React, { FC } from 'react';
import { Card, Heading } from '@project/shared/ui';
import cn from 'clsx';
import styles from './card-list.module.scss';

/* eslint-disable-next-line */
export interface CardListProps {
  list: IEventForCard[];
  title?: string;
  className?: string;
}

export const CardList: FC<CardListProps> = ({
  list,
  title,
  className,
  ...props
}) => {
  return (
    <div>
      <Heading className={'mb-3'}>{title}</Heading>
      <div className={cn(styles.cardList, [className])}>
        {list.length ? (
          list.map(card => <Card key={card.id} event={card} />)
        ) : (
          <p>Пока здесь ничего нет</p>
        )}
      </div>
    </div>
  );
};

export default CardList;
