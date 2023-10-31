import { render } from '@testing-library/react';

import NotificationFriend from './notification-friend';

describe('NotificationsFriends', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationFriend />);
    expect(baseElement).toBeTruthy();
  });
});
