/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageSSOIntegrationSecret } from './index';

test('renders ManageSSOIntegrationSecret Create component', () => {
    render(
        <TestWrapper>
            <ManageSSOIntegrationSecret
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
