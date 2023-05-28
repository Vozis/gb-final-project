import { forwardRef } from 'react';
import { IField } from '@project/shared/types';
import clsx from 'clsx';

import styles from './input.module.scss';
import { errorCatch } from '@project/shared/utils';

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, type = 'text', style, ...rest }, ref) => {
    return (
      <div className={clsx(styles.field)} style={style}>
        <label className={styles.fieldLabel}>
          <input
            className={clsx(styles.input)}
            ref={ref}
            type={type}
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

export default Field;
