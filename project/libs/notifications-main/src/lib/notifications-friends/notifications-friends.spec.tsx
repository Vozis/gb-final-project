import { render } from '@testing-library/react';

import NotificationsFriends from './notifications-friends';

describe('NotificationsFriends', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationsFriends />);
    expect(baseElement).toBeTruthy();
  });
});
