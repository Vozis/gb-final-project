import { render } from '@testing-library/react';

import SingleEventMain from './single-event-main';

describe('SingleEventMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SingleEventMain />);
    expect(baseElement).toBeTruthy();
  });
});
