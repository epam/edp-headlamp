/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { CreateEditCDPipeline } from './index';
import { CreateEditCDPipelineDialogForwardedProps } from './types';

const mockCreateForwardedProps: CreateEditCDPipelineDialogForwardedProps = {
  mode: 'create',
};

jest.mock('../../providers/Dialog/hooks', () => ({
  useSpecificDialogContext: jest.fn(() => ({
    open: true,
    forwardedProps: mockCreateForwardedProps,
    closeDialog: jest.fn(),
    openDialog: jest.fn(),
  })),
  useDialogContext: jest.fn(() => ({})),
}));

test('renders CreateEditCDPipeline Create component', () => {
  render(
    <TestWrapper>
      <CreateEditCDPipeline />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('dialog');
  expect(dialog).toMatchSnapshot();
});
