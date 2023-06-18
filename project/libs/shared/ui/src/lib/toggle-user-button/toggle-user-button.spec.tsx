import { render } from '@testing-library/react';

import ToggleUserButton from './toggle-user-button';

describe('ToggleUserButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToggleUserButton />);
    expect(baseElement).toBeTruthy();
  });
});
