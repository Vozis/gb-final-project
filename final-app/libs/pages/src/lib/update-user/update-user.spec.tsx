import { render } from '@testing-library/react';

import UpdateUser from './update-user';

describe('UpdateUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateUser />);
    expect(baseElement).toBeTruthy();
  });
});
