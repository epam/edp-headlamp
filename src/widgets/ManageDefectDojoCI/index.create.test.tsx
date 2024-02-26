/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageDefectDojoCI } from './index';

test('renders ManageDefectDojoCI Create component', () => {
  render(
    <TestWrapper>
      <ManageDefectDojoCI
        formData={{
          defectDojoSecret: null,
          defectDojoQuickLink: null,
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
