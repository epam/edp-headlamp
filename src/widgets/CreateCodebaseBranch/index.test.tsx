/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { CreateCodebaseBranch } from './index';
import { CreateCodebaseBranchDialogForwardedProps } from './types';

const mockForwardedProps: CreateCodebaseBranchDialogForwardedProps = {
    codebase: {
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
        },
    },
};

jest.mock('../../providers/Dialog/hooks', () => ({
    useSpecificDialogContext: jest.fn(() => ({
        open: true,
        forwardedProps: mockForwardedProps,
        closeDialog: jest.fn(),
        openDialog: jest.fn(),
    })),
}));

test('renders CreateCodebaseBranch component', () => {
    render(
        <TestWrapper>
            <CreateCodebaseBranch />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
});
