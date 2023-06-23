import { useEffect, useState } from 'react';
import { useSocketState } from '@project/shared/hooks';

export const useCheckUserStatus = (id: number) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const { onlineUsers } = useSocketState();

  useEffect(() => {
    setIsOnline(onlineUsers.some(userId => +userId === id));
  }, [onlineUsers]);

  return {
    isOnline,
  };
};
