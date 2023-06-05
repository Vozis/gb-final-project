import { render } from '@testing-library/react';

import CreateEventMain from './create-event-main';

describe('CreateEventMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateEventMain />);
    expect(baseElement).toBeTruthy();
  });
});
