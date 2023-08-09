/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { CreateEditCodebase } from './index';
import { CreateEditCodebaseDialogForwardedProps } from './types';

const mockCreateForwardedProps: CreateEditCodebaseDialogForwardedProps = {
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

test('renders CreateEditCodebase Create component', () => {
    render(
        <TestWrapper>
            <CreateEditCodebase />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
});
