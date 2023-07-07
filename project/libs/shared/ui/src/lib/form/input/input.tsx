import { forwardRef, useState } from 'react';
import { IField } from '@project/shared/types';
import cn from 'clsx';

import styles from './input.module.scss';
import { errorCatch } from '@project/shared/utils';
import { BiIcon } from '@project/shared/ui';

export const Field = forwardRef<HTMLInputElement, IField>(
  (
    {
      visibility,
      placeholder,
      error,
      type = 'text',
      style,
      onChange,
      children,
      ...rest
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
      <div className={cn(styles.field)} style={style}>
        <label className={styles.fieldLabel}>
          <input
            className={cn(styles.input)}
            ref={ref}
            type={
              type === 'password' ? (!isVisible ? 'password' : 'text') : type
            }
            placeholder={' '}
            onChange={onChange}
            {...rest}
          />
          <span className={styles.placeholder}>{placeholder}</span>
          {visibility && (
            <span
              className={styles.icon}
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <BiIcon name={'BiShow'} />
              ) : (
                <BiIcon name={'BiHide'} />
              )}
            </span>
          )}
        </label>
        {error && <div className={styles.error}>{errorCatch(error)}</div>}
      </div>
    );
  },
);

Field.displayName = 'Field';
