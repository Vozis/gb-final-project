import styles from './accordion.module.scss';
import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'clsx';
import { MaterialIcon } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface AccordionProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  className?: string;
  title?: string;
  isActive?: boolean;
  info?: string;
}

export const Accordion: FC<AccordionProps> = ({
  children,
  className,
  info,
  title = '',
  isActive = false,
}) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const nodeRef = useRef<HTMLDivElement>(null);
  const contentHeight = nodeRef.current?.scrollHeight;
  const handleToggleAccordion = () => {
    setIsOpen(!isOpen);
    // console.log(isOpen);
  };

  // console.log(children);

  const setAtToStringAndPx = (value: number): string => {
    return value.toString() + 'px';
  };
  useEffect(() => {
    if (nodeRef.current && contentHeight) {
      nodeRef.current.style.setProperty(
        '--content-height',
        setAtToStringAndPx(contentHeight),
      );
    }
  }, [contentHeight]);
  return (
    <div
      className={cn(styles.accordion, className, {
        Accordion__active: isOpen,
      })}
    >
      <div className={styles.accordion__header} onClick={handleToggleAccordion}>
        <h3 className={styles.accordion__title}>{title}</h3>
        <p className={''}>{info}</p>
        <MaterialIcon
          name={'MdKeyboardArrowDown'}
          className={styles.accordion__arrow}
        />
      </div>
      <div ref={nodeRef}>{isOpen && children}</div>
    </div>
  );
};

export default Accordion;
