import styles from './tag.module.scss';
import cn from 'clsx';
import { HTMLAttributes } from 'react';

/* eslint-disable-next-line */
export interface TagProps extends HTMLAttributes<HTMLButtonElement> {}

export function Tag({ children, className, onClick }: TagProps) {
  return (
    <button className={cn(styles.tag, className)} onClick={onClick}>
      <span className={'px-2'}>{children}</span>
    </button>
  );
}

export default Tag;
