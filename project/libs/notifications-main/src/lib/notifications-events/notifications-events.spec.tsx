import { render } from '@testing-library/react';

import NotificationsEvents from './notifications-events';

describe('NotificationsEvents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationsEvents />);
    expect(baseElement).toBeTruthy();
  });
});
