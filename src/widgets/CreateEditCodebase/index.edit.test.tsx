/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { CreateEditCodebase } from './index';
import { CreateEditCodebaseDialogForwardedProps } from './types';

const mockEditForwardedProps: CreateEditCodebaseDialogForwardedProps = {
    mode: 'edit',
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

test('renders CreateEditCodebase Edit component', () => {
    render(
        <TestWrapper>
            <CreateEditCodebase />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
});
