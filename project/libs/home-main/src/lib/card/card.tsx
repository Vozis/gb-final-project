import styles from './card.module.scss';
import { Button, MaterialIcon, Tag } from '@project/shared/ui';
import { IEvent, ITag } from '@project/shared/types';
import { FC } from 'react';
import clsx from 'clsx';

/* eslint-disable-next-line */
export interface CardProps {
  event: IEvent;
}

export const Card: FC<CardProps> = ({
  event: { imageUrl, name, description, tags },
}) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), linear-gradient(180deg, rgba(0, 0, 0, 0) 50.51%, rgba(0, 0, 0, 0.64) 79.75%), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <button className={styles.card__favouriteBtn}></button>
      <div className={styles.card__info}>
        <a href="/" className={styles.card__title}>
          {name}
        </a>
        <div className={styles.card__tags}>
          {tags.map(tag => (
            <Tag
              key={tag.id}
              className={clsx({
                'bg-red-300 hover:bg-red-400': tag.type === 'count',
                [styles.card__tag_place]: tag.type === 'place',
                'bg-green-300 hover:bg-green-400': tag.type === 'city',
                'bg-cyan-300 hover:bg-cyan-400': tag.type === 'sport',
              })}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
        <Button
          type={'button'}
          className={styles.card__btn}
          onClick={() => alert('click')}
        >
          Присоединиться
        </Button>
      </div>
    </div>
  );
};

export default Card;
