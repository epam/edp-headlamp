/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageNexus } from './index';

test('renders ManageNexus Create component', () => {
  render(
    <TestWrapper>
      <ManageNexus
        secret={null}
        quickLink={null}
        ownerReference={null}
        mode={FORM_MODES.CREATE}
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
