import { render } from '@testing-library/react';

import UpdateEventMain from './update-event-main';

describe('UpdateEventMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateEventMain />);
    expect(baseElement).toBeTruthy();
  });
});
