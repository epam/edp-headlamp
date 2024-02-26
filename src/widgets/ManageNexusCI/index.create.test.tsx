/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageNexusCI } from './index';

test('renders ManageNexusCI Create component', () => {
  render(
    <TestWrapper>
      <ManageNexusCI
        formData={{
          nexusSecret: null,
          ownerReference: undefined,
          nexusQuickLink: null,
          mode: FORM_MODES.CREATE,
          handleClosePanel: jest.fn(),
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
