/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageArgoCDCI } from './index';

test('renders ManageArgoCDCI Create component', () => {
  render(
    <TestWrapper>
      <ManageArgoCDCI
        formData={{
          argoCDSecret: null,
          argoCDQuickLink: null,
          ownerReference: undefined,
          mode: FORM_MODES.CREATE,
          handleClosePanel: jest.fn(),
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
