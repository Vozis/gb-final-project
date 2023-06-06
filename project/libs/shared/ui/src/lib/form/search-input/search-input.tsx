import styles from './search-input.module.scss';
import { forwardRef } from 'react';
import { IField } from '@project/shared/types';
import cn from 'clsx';

/* eslint-disable-next-line */

export const SearchField = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, style, onChange, ...rest }, ref) => {
    return (
      <div className={cn(styles.search)} style={style}>
        <label className={styles.search__wrapper}>
          <input
            className={cn(styles.search__input)}
            ref={ref}
            type={'text'}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
          />
        </label>
      </div>
    );
  },
);

SearchField.displayName = 'SearchField';
