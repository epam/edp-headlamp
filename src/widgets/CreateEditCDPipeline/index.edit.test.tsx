/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { CreateEditCDPipeline } from './index';
import { CreateEditCDPipelineDialogForwardedProps } from './types';

const mockEditForwardedProps: CreateEditCDPipelineDialogForwardedProps = {
  mode: 'edit',
  CDPipelineData: {
    metadata: {
      name: 'test-cdpipeline',
      uid: 'test-uid',
      creationTimestamp: 'test-creationTimestamp',
    },
    // @ts-ignore
    spec: {
      applications: ['test-application-1', 'test-application-2'],
      applicationsToPromote: ['test-application-1', 'test-application-2'],
      inputDockerStreams: ['test-application-1-main', 'test-application-2-main'],
    },
  },
};

jest.mock('../../providers/Dialog/hooks', () => ({
  useSpecificDialogContext: jest.fn(() => ({
    open: true,
    forwardedProps: mockEditForwardedProps,
    closeDialog: jest.fn(),
    openDialog: jest.fn(),
  })),
  useDialogContext: jest.fn(() => ({})),
}));

test('renders CreateEditCDPipeline Edit component', () => {
  render(
    <TestWrapper>
      <CreateEditCDPipeline />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('dialog');
  expect(dialog).toMatchSnapshot();
});
