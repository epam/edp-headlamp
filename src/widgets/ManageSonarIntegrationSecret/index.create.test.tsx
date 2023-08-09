/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageSonarIntegrationSecret } from './index';

test('renders ManageSonarIntegrationSecret Create component', () => {
    render(
        <TestWrapper>
            <ManageSonarIntegrationSecret
                formData={{
                    currentElement: 'placeholder',
                    handleDeleteRow: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
