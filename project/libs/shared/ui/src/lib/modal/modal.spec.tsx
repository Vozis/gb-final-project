import { render } from '@testing-library/react';

import { ModalWindow } from './modal';

describe('Modal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalWindow />);
    expect(baseElement).toBeTruthy();
  });
});
