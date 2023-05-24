import { render } from '@testing-library/react';

import FormReg from './form-reg';

describe('FormReg', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormReg />);
    expect(baseElement).toBeTruthy();
  });
});
