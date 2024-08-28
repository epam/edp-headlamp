/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../../mocks/wrappers/default';
import { ManageStageDialog } from './index';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('ManageStageDialog', () => {
  test('renders ManageStageDialog Create component', () => {
    render(
      <TestWrapper>
        <ManageStageDialog
          props={{
            CDPipelineData: {
              // @ts-ignore
              metadata: {
                name: 'test-cdpipeline-name',
              },
            },
            otherStages: [
              {
                // @ts-ignore
                metadata: {
                  name: 'test-cdpipeline-name-test-stage-1',
                },
                // @ts-ignore
                spec: {
                  name: 'test-stage-1',
                },
              },
              {
                // @ts-ignore
                metadata: {
                  name: 'test-cdpipeline-name-test-stage-2',
                },
                // @ts-ignore
                spec: {
                  name: 'test-stage-2',
                },
              },
            ],
          }}
          state={{
            open: true,
            openDialog: jest.fn(),
            closeDialog: jest.fn(),
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageStageDialog Edit component', () => {
    render(
      <TestWrapper>
        <ManageStageDialog
          props={{
            CDPipelineData: {
              // @ts-ignore
              metadata: {
                name: 'test-cdpipeline-name',
              },
            },
            otherStages: [
              {
                // @ts-ignore
                metadata: {
                  name: 'test-cdpipeline-name-test-stage-1',
                },
                // @ts-ignore
                spec: {
                  name: 'test-stage-1',
                },
              },
              {
                // @ts-ignore
                metadata: {
                  name: 'test-cdpipeline-name-test-stage-2',
                },
                // @ts-ignore
                spec: {
                  name: 'test-stage-2',
                },
              },
            ],
            stage: {
              // @ts-ignore
              metadata: {
                name: 'test-cdpipeline-name-test-stage-3',
              },
              // @ts-ignore
              spec: {
                name: 'test-stage-3',
              },
            },
          }}
          state={{
            open: true,
            openDialog: jest.fn(),
            closeDialog: jest.fn(),
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
  });
});
