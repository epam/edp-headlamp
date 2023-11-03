/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageGitServer } from './index';

test('renders ManageGitServer Create component', () => {
    render(
        <TestWrapper>
            <ManageGitServer
                formData={{
                    mode: FORM_MODES.CREATE,
                    gitServer: undefined,
                    gitServerSecret: undefined,
                    handleClosePanel: () => {
                        //
                    },
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
