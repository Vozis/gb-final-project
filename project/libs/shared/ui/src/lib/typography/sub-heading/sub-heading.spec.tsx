import { render } from '@testing-library/react';

import SubHeading from './sub-heading';

describe('SubHeading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubHeading />);
    expect(baseElement).toBeTruthy();
  });
});
