import styles from './card.module.scss';
import cn from 'clsx';

import { Avatar } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface CardProps {
  id: string;
  username: string;
  avatarImgUrl: string;
  description: string;
}

export function Card({ id, username, avatarImgUrl, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardHeader}>
          <div className={styles.cardUserInfo}>
            <Avatar avatarUrl={avatarImgUrl} />
            <a href="/" className={styles.cardUsername}>
              {username}
            </a>
          </div>
          <span>1 minute ago</span>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card;
