import useTypedSelector from './use-typed-selector';

export const useAuthRedux = () => useTypedSelector(state => state.user);
