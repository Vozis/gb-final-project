import styles from './card.module.scss';

import { Button } from '../../../../shared/ui/src/lib/button/button';
import { Tag } from '../../../../shared/ui/src/lib/tag/tag';

/* eslint-disable-next-line */
export interface CardProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export function Card({ id, name, imageUrl, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImageWrapper}>
          <img src={imageUrl} alt={name + 'img'} />
        </div>
        <div className={styles.cardUserInfo}>
          {/*<MaterialIcon name={'MdAccountBox'} className={styles.cardIcon} />*/}
          {/*<Avatar avatarUrl={avatarImgUrl} />*/}

          <a href="/" className={styles.cardTitle}>
            {name}
          </a>
          <div className={styles.cardTags}>
            <Tag onClick={() => console.log('sports')}>Sports</Tag>
            <Tag className={styles.cardTagPlace}>Place</Tag>
            <Tag className={styles.cardTagCount}>Count</Tag>
            <Tag>Time</Tag>
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
}

export default Card;
