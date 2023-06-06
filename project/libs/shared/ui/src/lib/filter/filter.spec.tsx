import { render } from '@testing-library/react';

import Filter from './filter';

describe('Filter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Filter />);
    expect(baseElement).toBeTruthy();
  });
});
