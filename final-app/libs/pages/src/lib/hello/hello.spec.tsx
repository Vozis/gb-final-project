import { render } from '@testing-library/react';

import Hello from './hello';

describe('Hello', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hello />);
    expect(baseElement).toBeTruthy();
  });
});
