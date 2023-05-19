import { render } from '@testing-library/react';

import AuthMain from './auth-main';

describe('AuthMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthMain />);
    expect(baseElement).toBeTruthy();
  });
});
