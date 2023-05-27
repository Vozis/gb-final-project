import { render } from '@testing-library/react';

import CardList from './card-list';

describe('CardList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardList />);
    expect(baseElement).toBeTruthy();
  });
});
