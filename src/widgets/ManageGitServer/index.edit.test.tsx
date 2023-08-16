/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageGitServer } from './index';

test('renders ManageGitServer Edit component', () => {
    render(
        <TestWrapper>
            <ManageGitServer
                formData={{
                    currentElement: {
                        apiVersion: 'v2.edp.epam.com/v1',
                        kind: 'GitServer',
                        // @ts-ignore
                        metadata: { name: 'github.com-8ygse' },
                        spec: {
                            gitHost: 'github.com',
                            nameSshKeySecret: 'github.com-8ygse-config',
                            sshPort: 22,
                            httpsPort: 443,
                            gitUser: 'git',
                            gitProvider: 'gerrit',
                        },
                    },
                    isReadOnly: true,
                    handleDeleteRow: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
