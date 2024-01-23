/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageGitOps } from './index';

test('renders ManageGitOps Create component', () => {
  render(
    <TestWrapper>
      <ManageGitOps
        formData={{
          currentElement: 'placeholder',
          handleClosePlaceholder: jest.fn(),
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
