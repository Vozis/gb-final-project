import { render } from '@testing-library/react';

import UserRating from './user-rating';

describe('UserRating', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserRating />);
    expect(baseElement).toBeTruthy();
  });
});
