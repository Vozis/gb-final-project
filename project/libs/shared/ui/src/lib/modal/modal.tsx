import styles from './modal.module.scss';
import React from 'react';
import clsx from 'clsx';

/* eslint-disable-next-line */
export interface ModalProps {
  active?: boolean;
  setActive: React.Dispatch<any>;
  children: React.ReactNode;
}

export function Modal({ active, setActive, children }: ModalProps) {
  return (
    <div
      className={clsx(styles.modal, {
        [styles.active]: active,
      })}
      onClick={() => setActive(false)}
    >
      <div
        className={clsx(styles.modal__content, {
          [styles.active]: active,
        })}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
