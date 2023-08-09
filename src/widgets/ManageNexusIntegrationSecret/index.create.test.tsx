/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageNexusIntegrationSecret } from './index';

test('renders ManageNexusIntegrationSecret Create component', () => {
    render(
        <TestWrapper>
            <ManageNexusIntegrationSecret
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
