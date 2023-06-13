import styles from './card-list.module.scss';

import Card from '../card/card';
import { IEvent, IEventForCard } from '@project/shared/types';
import React, { FC } from 'react';

/* eslint-disable-next-line */
export interface CardListProps {
  list: IEventForCard[];
}

export const CardList: FC<CardListProps> = ({ list }) => {
  return (
    <div>
      {list.length ? (
        list.map(card => <Card key={card.id} event={card} />)
      ) : (
        <p>Пока здесь ничего нет</p>
      )}
    </div>
  );
};

export default CardList;
