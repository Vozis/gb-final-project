import { forwardRef } from 'react';
import { IField } from '@project/shared/types';
import cn from 'clsx';

import styles from './input.module.scss';
import { errorCatch } from '@project/shared/utils';

export const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, type = 'text', style, onChange, ...rest }, ref) => {
    return (
      <div className={cn(styles.field)} style={style}>
        <label className={styles.fieldLabel}>
          <input
            className={cn(styles.input)}
            ref={ref}
            type={type}
            placeholder={' '}
            onChange={onChange}
            {...rest}
          />
          <span className={styles.placeholder}>{placeholder}</span>
        </label>
        {error && <div className={styles.error}>{errorCatch(error)}</div>}
      </div>
    );
  },
);

Field.displayName = 'Field';
