import { render } from '@testing-library/react';

import UpdateEvent from './update-event';

describe('UpdateEvent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateEvent />);
    expect(baseElement).toBeTruthy();
  });
});
