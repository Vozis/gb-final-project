import { render } from '@testing-library/react';

import ProfileHobbies from './profile-hobbies';

describe('ProfileHobbies', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileHobbies />);
    expect(baseElement).toBeTruthy();
  });
});
