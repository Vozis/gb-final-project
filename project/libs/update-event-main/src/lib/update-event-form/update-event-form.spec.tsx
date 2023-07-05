import { render } from '@testing-library/react';

import UpdateEventForm from './update-event-form';

describe('UpdateEventForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateEventForm />);
    expect(baseElement).toBeTruthy();
  });
});
