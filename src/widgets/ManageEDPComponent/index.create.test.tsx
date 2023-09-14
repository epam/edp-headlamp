/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageEDPComponent } from './index';

test('renders ManageEDPComponent Create component', () => {
    render(
        <TestWrapper>
            <ManageEDPComponent
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
