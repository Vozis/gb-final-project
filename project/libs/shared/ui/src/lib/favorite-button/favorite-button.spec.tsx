import { render } from '@testing-library/react';

import FavoriteButton from './favorite-button';

describe('FavoriteButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FavoriteButton />);
    expect(baseElement).toBeTruthy();
  });
});
