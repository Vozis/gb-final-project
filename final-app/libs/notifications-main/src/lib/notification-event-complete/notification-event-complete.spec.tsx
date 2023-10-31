import { render } from '@testing-library/react';

import NotificationEventComplete from './notification-event-complete';

describe('NotificationsEvents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationEventComplete />);
    expect(baseElement).toBeTruthy();
  });
});
