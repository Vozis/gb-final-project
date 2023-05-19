// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TypeRootState } from '@project/shared/store';

const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector;
export default useTypedSelector;
