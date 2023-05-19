import { render } from '@testing-library/react';

import ProfileMain from './profile-main';

describe('ProfileMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileMain />);
    expect(baseElement).toBeTruthy();
  });
});
