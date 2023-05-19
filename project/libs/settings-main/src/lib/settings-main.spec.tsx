import { render } from '@testing-library/react';

import SettingsMain from './settings-main';

describe('SettingsMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsMain />);
    expect(baseElement).toBeTruthy();
  });
});
