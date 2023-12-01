/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageJiraIntegrationSecret } from './index';

test('renders ManageJiraIntegrationSecret Create component', () => {
    render(
        <TestWrapper>
            <ManageJiraIntegrationSecret
                formData={{
                    jiraServer: null,
                    jiraServerSecret: null,
                    mode: FORM_MODES.CREATE,
                    handleClosePanel: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
