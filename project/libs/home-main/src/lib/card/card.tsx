import styles from './card.module.scss';

import { Avatar } from '@project/shared/ui';
import Button from '../button/button';

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
        <div className={styles.cardBody}></div>
        <p>{description}</p>
        <button className={styles.cardButton}>Join</button>
      </div>
    </div>
  );
}

export default Card;
