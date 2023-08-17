/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageJiraIntegrationSecret } from './index';

test('renders ManageJiraIntegrationSecret Edit component', () => {
    render(
        <TestWrapper>
            <ManageJiraIntegrationSecret
                formData={{
                    currentElement: {
                        // @ts-ignore
                        metadata: {
                            name: 'jira-user',
                            uid: 'test-uid',
                            labels: {
                                'app.edp.epam.com/secret-type': 'jira',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'apiVersion',
                                    kind: 'ExternalSecret',
                                    name: 'jira-user',
                                    uid: 'test-uid',
                                    controller: true,
                                    blockOwnerDeletion: true,
                                },
                            ],
                        },
                        immutable: false,
                        data: { username: 'dGVzdC11c2Vy', password: 'dGVzdC1wYXNzd29yZA==' },
                        type: 'Opaque',
                    },
                    handleDeleteRow: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});