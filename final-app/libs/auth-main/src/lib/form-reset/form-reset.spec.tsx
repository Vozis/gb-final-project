import { render } from '@testing-library/react';

import FormReset from './form-reset';

describe('FormReset', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormReset />);
    expect(baseElement).toBeTruthy();
  });
});
