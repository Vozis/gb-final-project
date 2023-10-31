import { render } from '@testing-library/react';

import CommentsItem from './comments-item';

describe('CommentsItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentsItem />);
    expect(baseElement).toBeTruthy();
  });
});
