import { forwardRef } from 'react';
import { IField } from '@project/shared/types';
import cn from 'clsx';

import styles from './input.module.scss';
import { errorCatch } from '@project/shared/utils';

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, type = 'text', style, ...rest }, ref) => {
    return (
      <div className={cn(styles.field)} style={style}>
        <label>
          <span>{placeholder}</span>
          <input ref={ref} type={type} {...rest} />
        </label>
        {error && <div className={styles.error}>{errorCatch(error)}</div>}
      </div>
    );
  },
);

Field.displayName = 'Field';

export default Field;
