import useTypedSelector from './use-typed-selector';

export const useFilterState = () => useTypedSelector(state => state.filter);
