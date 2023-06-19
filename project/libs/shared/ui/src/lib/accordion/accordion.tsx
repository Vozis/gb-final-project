import styles from './accordion.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { MaterialIcon } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface AccordionProps {
  className?: string;
  title?: string;
  isActive?: boolean;
  children?: React.ReactNode;
}

export function Accordion({
  className,
  title = '',
  isActive = false,
  children,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(isActive);
  const nodeRef = useRef<HTMLDivElement>(null);
  const contentHeight = nodeRef.current?.scrollHeight;
  const handleToggleAccordion = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
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
      className={clsx(styles.accordion, className, {
        Accordion__active: isOpen,
      })}
    >
      <div className={styles.accordion__header} onClick={handleToggleAccordion}>
        <h3 className={styles.accordion__title}>{title}</h3>
        <MaterialIcon
          name={'MdKeyboardArrowDown'}
          className={styles.accordion__arrow}
        />
      </div>
      <div ref={nodeRef}>{isOpen && children}</div>
    </div>
  );
}

export default Accordion;
