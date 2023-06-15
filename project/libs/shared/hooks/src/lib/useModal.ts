import { useState } from 'react';

export const useModal = (initialValue: boolean): [boolean, () => void] => {
  const [isShow, setIsShow] = useState(initialValue);

  const handleToggleShow = () => {
    setIsShow(!isShow);
  };
  return [isShow, handleToggleShow];
};
