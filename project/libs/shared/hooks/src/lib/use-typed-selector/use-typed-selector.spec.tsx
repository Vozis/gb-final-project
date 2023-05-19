import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useTypedSelector from './use-typed-selector';

describe('useTypedSelector', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useTypedSelector());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
