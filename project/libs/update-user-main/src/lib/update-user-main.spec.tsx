import { render } from '@testing-library/react';

import UpdateUserMain from './update-user-main';

describe('UpdateUserMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateUserMain />);
    expect(baseElement).toBeTruthy();
  });
});
