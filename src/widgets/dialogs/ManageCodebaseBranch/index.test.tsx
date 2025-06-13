/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../../mocks/wrappers/default';
import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../k8s/groups/EDP/CodebaseBranch/types';
import { ManageCodebaseBranchDialog } from './index';

const mockCodebase = {
  metadata: {
    name: 'test-codebase',
    uid: 'test-uid',
    creationTimestamp: 'test-creationTimestamp',
  },
  // @ts-ignore
  spec: {
    defaultBranch: 'test-default-branch',
    versioning: {
      type: 'edp',
      startFrom: '0.0.0-SNAPSHOT',
    },
    gitUrlPath: '/test-owner/test-repo-name',
  },
};
const mockPipelines = {
  review: 'test-review-pipeline',
  build: 'test-build-pipeline',
};

const mockDefaultBranch = {
  metadata: {
    name: 'test-default-branch',
    uid: 'test-uid',
    creationTimestamp: 'test-creationTimestamp',
  },
  // @ts-ignore
  spec: {
    branchName: 'test-branch-name',
    version: '0.0.0-SNAPSHOT',
  },
  status: {
    status: 'created',
  },
};

const mockCodebaseBranch = {
  metadata: {
    name: 'test-codebase-branch',
    uid: 'test-uid',
    creationTimestamp: 'test-creationTimestamp',
  },
  // @ts-ignore
  spec: {
    branchName: 'test-branch-name',
    version: '0.0.0-SNAPSHOT',
  },
};

describe('ManageCodebaseBranchDialog', () => {
  test('renders ManageCodebaseBranchDialog Create component', () => {
    render(
      <TestWrapper>
        <ManageCodebaseBranchDialog
          props={{
            codebaseBranches: [],
            codebase: mockCodebase as CodebaseKubeObjectInterface,
            defaultBranch: mockDefaultBranch as CodebaseBranchKubeObjectInterface,
            codebaseBranch: mockCodebaseBranch as CodebaseBranchKubeObjectInterface,
            pipelines: mockPipelines,
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

  test('renders ManageCodebaseBranchDialog Edit component', () => {
    render(
      <TestWrapper>
        <ManageCodebaseBranchDialog
          props={{
            codebaseBranches: [],
            codebase: mockCodebase as CodebaseKubeObjectInterface,
            defaultBranch: mockDefaultBranch as CodebaseBranchKubeObjectInterface,
            codebaseBranch: undefined,
            pipelines: mockPipelines,
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
