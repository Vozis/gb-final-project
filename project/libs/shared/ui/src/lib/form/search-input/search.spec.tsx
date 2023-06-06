import { render } from '@testing-library/react';

import Search from './search-input';

describe('Search', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Search />);
    expect(baseElement).toBeTruthy();
  });
});
