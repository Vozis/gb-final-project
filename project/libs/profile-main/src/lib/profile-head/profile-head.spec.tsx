import { render } from '@testing-library/react';

import ProfileHead from './profile-head';

describe('ProfileHead', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileHead />);
    expect(baseElement).toBeTruthy();
  });
});
