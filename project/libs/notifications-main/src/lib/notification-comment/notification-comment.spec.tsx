import { render } from '@testing-library/react';

import NotificationComment from './notification-comment';

describe('NotificationsComments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationComment />);
    expect(baseElement).toBeTruthy();
  });
});
