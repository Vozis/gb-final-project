import styles from './modal.module.scss';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Button } from '../button/button';
import { MaterialIcon } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface ModalProps {
  show?: boolean;
  onCloseClick: React.Dispatch<any>;
  isBtnClose?: boolean;
  className?: string;
  children: React.ReactNode;
}

// const body = document.body;

export function Modal({
  show,
  onCloseClick,
  children,
  className,
  isBtnClose = false,
}: ModalProps) {
  // useEffect(() => {
  //   body.style.overflow = show ? 'hidden' : 'unset';
  // }, [show]);

  return (
    <div
      className={clsx(styles.modal, className, {
        [styles.active]: show,
      })}
      onClick={onCloseClick}
    >
      <div
        className={clsx(styles.modal__content, {
          [styles.active]: show,
        })}
        onClick={e => e.stopPropagation()}
      >
        {isBtnClose && (
          <Button
            type={'button'}
            className={
              styles.modal__btnClose + ' border-none hover:text-zinc-700'
            }
            onClick={onCloseClick}
          >
            <MaterialIcon
              name={'MdOutlineClose'}
              className={'text-3xl hover:text-zinc-700'}
            />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}

export default Modal;
