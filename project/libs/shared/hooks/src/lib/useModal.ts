import { useState } from 'react';

export const useModal = (initialValue = false): [boolean, () => void] => {
  const [isShow, setIsShow] = useState(initialValue);
  // const [locked, setLocked] = useLockedBody(false, 'root');

  const handleToggleShow = () => {
    setIsShow(!isShow);
    // setLocked(!locked);
  };

  return [isShow, handleToggleShow];
};
