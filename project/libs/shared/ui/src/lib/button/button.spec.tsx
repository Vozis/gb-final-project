import { render } from '@testing-library/react';

import Button from './button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Button
        text={''}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
