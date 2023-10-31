import { render } from '@testing-library/react';

import NotificationEvent from './notification-event';

describe('NotificationsEvents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationEvent />);
    expect(baseElement).toBeTruthy();
  });
});
