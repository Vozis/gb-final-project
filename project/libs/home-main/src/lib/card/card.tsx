import styles from './card.module.scss';
import { Button, Tag } from '@project/shared/ui';
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
  console.log(tags);
  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImageWrapper}>
          <img src={imageUrl} alt={name} />
        </div>
        <div className={styles.cardUserInfo}>
          {/*<MaterialIcon name={'MdAccountBox'} className={styles.cardIcon} />*/}
          {/*<Avatar avatarUrl={avatarImgUrl} />*/}

          <a href="/" className={styles.cardTitle}>
            {name}
          </a>
          <div className={styles.cardTags}>
            {tags.map(tag => (
              <Tag
                key={tag.id}
                className={clsx({
                  'bg-red-300 hover:bg-red-400': tag.type === 'count',
                  'bg-amber-300 hover:bg-amber-400': tag.type === 'place',
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
            className={styles.cardBtn}
            onClick={() => alert('click')}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
