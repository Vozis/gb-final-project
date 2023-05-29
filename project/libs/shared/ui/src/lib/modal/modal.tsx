import styles from './modal.module.scss';
import React from 'react';
import clsx from 'clsx';
import MaterialIcon from '../icons/material-icon';
import { Button } from '../button/button';

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
        <Button
          type={'button'}
          className={
            styles.modal__btnClose + ' border-none hover:text-zinc-700'
          }
          onClick={() => setActive(false)}
        >
          <MaterialIcon
            name={'MdOutlineClose'}
            className={'text-3xl hover:text-zinc-700'}
          />
        </Button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
