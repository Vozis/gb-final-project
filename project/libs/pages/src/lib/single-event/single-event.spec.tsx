import { render } from '@testing-library/react';

import SingleEvent from './single-event';

describe('SingleEvent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SingleEvent />);
    expect(baseElement).toBeTruthy();
  });
});
