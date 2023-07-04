import { render } from '@testing-library/react';

import NotificationsComments from './notifications-comments';

describe('NotificationsComments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationsComments />);
    expect(baseElement).toBeTruthy();
  });
});
