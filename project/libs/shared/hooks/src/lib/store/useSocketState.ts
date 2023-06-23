import useTypedSelector from './use-typed-selector';

export const useSocketState = () => useTypedSelector(state => state.socket);
