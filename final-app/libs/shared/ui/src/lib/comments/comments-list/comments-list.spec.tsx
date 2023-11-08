import { render } from '@testing-library/react';

import CommentsList from './comments-list';

describe('CommentsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentsList />);
    expect(baseElement).toBeTruthy();
  });
});
