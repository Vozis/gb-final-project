import styles from './card-list.module.scss';

import Card from '../card/card';
import { IEvent } from '@project/shared/types';

/* eslint-disable-next-line */
export interface CardListProps {
  list: IEvent[];
}

export function CardList({ list }: CardListProps) {
  return (
    <div>
      {list.map(card => (
        <Card key={card.id} event={card} />
      ))}
    </div>
  );
}

export default CardList;
