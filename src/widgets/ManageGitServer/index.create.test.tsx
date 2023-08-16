/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageGitServer } from './index';

test('renders ManageGitServer Create component', () => {
    render(
        <TestWrapper>
            <ManageGitServer
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
