import useTypedSelector from './use-typed-selector';

export const useNotificationState = () =>
  useTypedSelector(state => state.notification);
