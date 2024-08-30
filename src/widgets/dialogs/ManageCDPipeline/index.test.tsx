/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../../mocks/wrappers/default';
import { ManageCDPipelineDialog } from '.';

describe('ManageCDPipelineDialog', () => {
  test('renders ManageCDPipelineDialog Create component', () => {
    render(
      <TestWrapper>
        <ManageCDPipelineDialog
          props={{
            CDPipelineData: null,
          }}
          state={{
            open: true,
            closeDialog: jest.fn(),
            openDialog: jest.fn(),
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageCDPipelineDialog Edit component', () => {
    render(
      <TestWrapper>
        <ManageCDPipelineDialog
          props={{
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
          }}
          state={{
            open: true,
            closeDialog: jest.fn(),
            openDialog: jest.fn(),
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
  });
});
