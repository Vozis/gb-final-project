import { render } from '@testing-library/react';

import SharedProviders from './shared-providers';

describe('SharedProviders', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedProviders />);
    expect(baseElement).toBeTruthy();
  });
});
