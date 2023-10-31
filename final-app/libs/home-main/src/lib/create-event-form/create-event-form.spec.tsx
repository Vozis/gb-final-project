import { render } from '@testing-library/react';

import CreateEventForm from './create-event-form';

describe('CreateEventForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateEventForm />);
    expect(baseElement).toBeTruthy();
  });
});
