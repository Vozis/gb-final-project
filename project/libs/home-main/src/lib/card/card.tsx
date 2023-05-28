import styles from './card.module.scss';
import { Button, Tag } from '@project/shared/ui';
import { IEvent, ITag } from '@project/shared/types';
import { FC } from 'react';

/* eslint-disable-next-line */
export interface CardProps {
  event: IEvent;
}

export const Card: FC<CardProps> = ({
  event: { imageUrl, name, description, tags },
}) => {
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
              <Tag key={tag.id} className={styles.cardTagPlace}>
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
