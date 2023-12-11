/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageSonarCI } from './index';

test('renders ManageSonarCI Create component', () => {
    render(
        <TestWrapper>
            <ManageSonarCI
                formData={{
                    sonarSecret: null,
                    ownerReference: undefined,
                    isReadOnly: false,
                    mode: FORM_MODES.CREATE,
                    handleClosePanel: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
