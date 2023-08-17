/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { CreateEditStage } from './index';
import { CreateEditStageDialogForwardedProps } from './types';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

const mockEditForwardedProps: CreateEditStageDialogForwardedProps = {
    mode: 'edit',
    CDPipelineData: {
        // @ts-ignore
        metadata: {
            name: 'test-cdpipeline-name',
        },
    },
    ciTool: 'tekton',
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

test('renders CreateEditStage Edit component', () => {
    render(
        <TestWrapper>
            <CreateEditStage />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
});