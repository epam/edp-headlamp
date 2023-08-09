/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { CreateGitServer } from './index';

jest.mock('../../providers/Dialog/hooks', () => ({
    useSpecificDialogContext: jest.fn(() => ({
        open: true,
        forwardedProps: {},
        closeDialog: jest.fn(),
        openDialog: jest.fn(),
    })),
}));

test('renders CreateGitServer component', () => {
    render(
        <TestWrapper>
            <CreateGitServer />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
});
