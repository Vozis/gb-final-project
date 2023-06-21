import useTypedSelector from './use-typed-selector';

export const useCommentState = () => useTypedSelector(state => state.comments);
