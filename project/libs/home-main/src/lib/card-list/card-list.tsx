import styles from './card-list.module.scss';

import Card from '../card/card';
import { IEvent } from '@project/shared/types';
import { FC } from 'react';

/* eslint-disable-next-line */
export interface CardListProps {
  list: IEvent[];
}

export const CardList: FC<CardListProps> = ({ list }) => {
  return (
    <div>
      {list.map(card => (
        <Card key={card.id} event={card} />
      ))}
    </div>
  );
};

export default CardList;
