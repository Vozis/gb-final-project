import { render } from '@testing-library/react';

import UploadField from './upload-field';

describe('UploadField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadField />);
    expect(baseElement).toBeTruthy();
  });
});
