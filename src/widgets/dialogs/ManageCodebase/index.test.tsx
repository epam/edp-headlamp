/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../../mocks/wrappers/default';
import { ManageCodebaseDialog } from '.';

describe('ManageCodebaseDialog', () => {
  test('renders ManageCodebaseDialog Create component', () => {
    render(
      <TestWrapper>
        <ManageCodebaseDialog
          props={{
            codebaseData: undefined,
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

  test('renders ManageCodebaseDialog Edit component', () => {
    render(
      <TestWrapper>
        <ManageCodebaseDialog
          props={{
            codebaseData: {
              // @ts-ignore
              metadata: {
                name: 'test-codebase-name',
              },
              // @ts-ignore
              spec: {
                jiraIssueMetadataPayload: '{"components":"asd","fixVersions":"zxc","labels":"qwe"}',
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
