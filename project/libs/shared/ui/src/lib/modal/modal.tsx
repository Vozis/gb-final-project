import styles from './modal.module.scss';
import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import cn from 'clsx';
import { Button } from '../button/button';
import { MaterialIcon } from '@project/shared/ui';
import { useTheme } from '@project/shared/hooks';

/* eslint-disable-next-line */
export interface ModalProps {
  show?: boolean;
  onCloseClick: React.Dispatch<any>;
  isBtnClose?: boolean;
  className?: string;
  isFirstType?: boolean;
  isSecondType?: boolean;
  children: React.ReactNode;
  height?: string;
  ref?: React.Ref<HTMLDivElement> | null;
}

// const body = document.body;
export const ModalWindow = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      height,
      className,
      isFirstType = false,
      isSecondType = false,
      show,
      children,
      onCloseClick,
      isBtnClose = false,
    },
    ref,
  ) => {
    const { theme } = useTheme();
    return ReactDOM.createPortal(
      <div
        className={cn(styles.modal, className, {
          [styles.firstType]: isFirstType,
          [styles.secondType]: isSecondType,
          [styles.active]: show,
        })}
        onClick={onCloseClick}
      >
        <div
          ref={ref}
          style={{ maxHeight: `${height}` }}
          className={cn(styles.modal__content, className, {
            [styles.active]: show,
            [styles.firstType__content]: isFirstType,
            [styles.secondType__content]: isSecondType,
            [styles.dark]: theme === 'dark',
            [styles.light]: theme === 'light',
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
      </div>,
      document.body,
    );
  },
);
ModalWindow.displayName = 'Field';
// export function Modal({
//   show,
//   onCloseClick,
//   children,
//   className,
//   isBtnClose = false,
//   isProfileModal = false,
// }: ModalProps) {
//   const modalHeight = useRef<HTMLDivElement>(null);
//   const [height, setHeight] = useState('0px');
//
//   useEffect(() => {
//     if (isProfileModal) {
//       if (modalHeight.current) {
//         setHeight(show ? `${modalHeight.current.scrollHeight}px` : '0px');
//       }
//     }
//   }, [show]);
//   // console.log('height', height);
//   return (
//     <div>
//       <div
//         className={clsx(styles.modal, className, {
//           [styles.profile__modal_setting]: isProfileModal,
//           [styles.active]: show,
//         })}
//         onClick={onCloseClick}
//       >
//         <div
//           ref={modalHeight}
//           style={{ maxHeight: `${height}` }}
//           className={clsx(styles.modal__content, {
//             [styles.active]: show,
//             [styles.profile__modal_setting__content]: isProfileModal,
//           })}
//           onClick={e => {
//             e.stopPropagation();
//           }}
//         >
//           {isBtnClose && (
//             <Button
//               type={'button'}
//               className={
//                 styles.modal__btnClose + ' border-none hover:text-zinc-700'
//               }
//               onClick={onCloseClick}
//             >
//               <MaterialIcon
//                 name={'MdOutlineClose'}
//                 className={'text-3xl hover:text-zinc-700'}
//               />
//             </Button>
//           )}
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

export default ModalWindow;
