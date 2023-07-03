import { render } from '@testing-library/react';

import FriendsList from './friends-list';

describe('FriendsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FriendsList />);
    expect(baseElement).toBeTruthy();
  });
});
