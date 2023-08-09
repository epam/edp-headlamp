/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { CreateCodebaseFromTemplate } from './index';
import { CreateCodebaseFromTemplateDialogForwardedProps } from './types';

const mockForwardedProps: CreateCodebaseFromTemplateDialogForwardedProps = {
    template: {
        kind: 'Template',
        metadata: {
            name: 'test-template',
            uid: 'test-uid',
            creationTimestamp: 'test-creationTimestamp',
        },
        spec: {
            displayName: 'test-displayName',
            description: 'test-description',
            language: 'test-language',
            framework: 'test-framework',
            buildTool: 'test-buildTool',
            type: 'test-type',
            version: 'test-version',
            source: 'test-source',
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

test('renders CreateCodebaseFromTemplate component', () => {
    render(
        <TestWrapper>
            <CreateCodebaseFromTemplate />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
});
