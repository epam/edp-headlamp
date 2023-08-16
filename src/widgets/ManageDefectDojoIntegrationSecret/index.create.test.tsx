/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageDefectDojoIntegrationSecret } from './index';

test('renders ManageDefectDojoIntegrationSecret Create component', () => {
    render(
        <TestWrapper>
            <ManageDefectDojoIntegrationSecret
                formData={{
                    currentElement: 'placeholder',
                    handleClosePlaceholder: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
