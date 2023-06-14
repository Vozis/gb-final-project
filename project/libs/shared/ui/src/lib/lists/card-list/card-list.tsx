import styles from './card-list.module.scss';

import { IEvent, IEventForCard } from '@project/shared/types';
import React, { FC } from 'react';
import { Card, Heading } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface CardListProps {
  list: IEventForCard[];
  title?: string;
}

export const CardList: FC<CardListProps> = ({ list, title }) => {
  return (
    <div>
      <Heading className={'mb-3'}>{title}</Heading>
      <div>
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
