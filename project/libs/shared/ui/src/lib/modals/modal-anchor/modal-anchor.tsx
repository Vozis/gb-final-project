import styles from './modal-anchor.module.scss';
import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import cn from 'clsx';
import { useTheme } from '@project/shared/hooks';

/* eslint-disable-next-line */
export interface ModalAnchorProps {
  show?: boolean;
  onCloseClick: React.Dispatch<any>;
  className?: string;
  children: React.ReactNode;
  height?: string;
  top?: string;
  right?: string;
  ref?: React.Ref<HTMLDivElement> | null;
}

// const body = document.body;
export const ModalAnchor = forwardRef<HTMLDivElement, ModalAnchorProps>(
  ({ height, top, right, className, show, children, onCloseClick }, ref) => {
    const { theme } = useTheme();
    return ReactDOM.createPortal(
      <div
        ref={ref}
        style={{
          maxHeight: `${height}`,
          top: `${top}`,
          right: `${right}`,
        }}
        className={cn(styles.modal, [className, theme], {
          [styles.active]: show,
        })}
        onClick={onCloseClick}
      >
        {children}
      </div>,
      document.body,
    );
  },
);
ModalAnchor.displayName = 'ModalAnchor';

export default ModalAnchor;
