import { render } from '@testing-library/react';

import SingleUser from './single-user';

describe('SingleUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SingleUser />);
    expect(baseElement).toBeTruthy();
  });
});
