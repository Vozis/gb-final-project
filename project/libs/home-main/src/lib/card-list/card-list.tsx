import styles from './card-list.module.scss';

import Card from '../card/card';

/* eslint-disable-next-line */
export interface CardListProps {
  list: {
    id: string;
    name: string;
    imageUrl: string;
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
          name={card.name}
          imageUrl={card.imageUrl}
          description={card.description}
        />
      ))}
    </div>
  );
}

export default CardList;
