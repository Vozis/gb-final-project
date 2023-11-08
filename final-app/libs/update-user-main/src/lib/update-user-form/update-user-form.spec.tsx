import { render } from '@testing-library/react';

import UpdateUserForm from './update-user-form';

describe('UpdateUserForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateUserForm />);
    expect(baseElement).toBeTruthy();
  });
});
