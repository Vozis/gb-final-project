import { render } from '@testing-library/react';

import ProfileForm from './profile-form';

describe('ProfileForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileForm />);
    expect(baseElement).toBeTruthy();
  });
});
