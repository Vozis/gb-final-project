import { render } from '@testing-library/react';

import NotificationsMain from './notifications-main';

describe('NotificationsMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationsMain />);
    expect(baseElement).toBeTruthy();
  });
});
