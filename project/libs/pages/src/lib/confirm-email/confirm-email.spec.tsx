import { render } from '@testing-library/react';

import ConfirmEmail from './confirm-email';

describe('ConfirmEmail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfirmEmail />);
    expect(baseElement).toBeTruthy();
  });
});
