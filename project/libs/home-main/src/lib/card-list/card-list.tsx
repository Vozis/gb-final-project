import styles from './card-list.module.scss';

import Card from '../card/card';

/* eslint-disable-next-line */
export interface CardListProps {
  list: {
    id: string;
    cardTitle: string;
    cardImgUrl: string;
    description: string;
  }[];
}

export function CardList({ list }: CardListProps) {
  return (
    <div>
      {list.map(card => (
        <Card
          key={card.id}
          id={card.id}
          cardTitle={card.cardTitle}
          cardImgUrl={card.cardImgUrl}
          description={card.description}
        />
      ))}
    </div>
  );
}

export default CardList;
