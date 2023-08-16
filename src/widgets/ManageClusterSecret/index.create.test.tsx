/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageClusterSecret } from './index';

test('renders ManageClusterSecret Create component', () => {
    render(
        <TestWrapper>
            <ManageClusterSecret
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
