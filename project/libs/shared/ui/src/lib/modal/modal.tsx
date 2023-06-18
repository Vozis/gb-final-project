import styles from './modal.module.scss';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../button/button';
import { MaterialIcon } from '@project/shared/ui';
import { strings } from '@angular-devkit/core';

/* eslint-disable-next-line */
export interface ModalProps {
  show?: boolean;
  onCloseClick: React.Dispatch<any>;
  isBtnClose?: boolean;
  className?: string;
  isProfileModal?: boolean;
  children: React.ReactNode;
}

// const body = document.body;

export function Modal({
  show,
  onCloseClick,
  children,
  className,
  isBtnClose = false,
  isProfileModal = false,
}: ModalProps) {
  const modalHeight = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (modalHeight.current) {
      setHeight(show ? `${modalHeight.current.scrollHeight}px` : '0px');
      console.log('effect', height);
    }
  }, [show]);
  console.log('height', height);
  return (
    <div>
      <div
        className={clsx(styles.modal, className, {
          [styles.profile__modal]: isProfileModal,
          [styles.profile__modal_active]: show,
        })}
        onClick={onCloseClick}
      >
        <div
          ref={modalHeight}
          style={{ maxHeight: `${height}` }}
          className={clsx(styles.modal__content, {
            [styles.active]: show,
            [styles.profile__modal__content]: isProfileModal,
          })}
          onClick={e => {
            e.stopPropagation();
          }}
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
    </div>
  );
}

export default Modal;
