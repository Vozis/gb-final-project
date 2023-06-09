import { render } from '@testing-library/react';

import SecondaryButton from './secondary-button';

describe('SecondaryButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecondaryButton />);
    expect(baseElement).toBeTruthy();
  });
});
