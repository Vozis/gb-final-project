import { render } from '@testing-library/react';

import SingleEventHead from './single-event-head';

describe('SingleEventHead', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SingleEventHead />);
    expect(baseElement).toBeTruthy();
  });
});
