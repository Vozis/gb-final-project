import { useActions } from '@project/shared/hooks';
import { useEffect } from 'react';

export const useClearStore = () => {
  const {
    resetFilterState,
    resetNotificationState,
    resetCommentsState,
    resetSocketState,
  } = useActions();

  useEffect(() => {
    resetFilterState();
    resetNotificationState();
    resetCommentsState();
    resetSocketState();
  }, []);
};
