import { render } from '@testing-library/react';

import SingleUserMain from './single-user-main';

describe('SingleUserMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SingleUserMain />);
    expect(baseElement).toBeTruthy();
  });
});
