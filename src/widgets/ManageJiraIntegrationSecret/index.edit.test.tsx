/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { INTEGRATION_SECRET_NAMES } from '../../k8s/Secret/constants';
import { FORM_MODES } from '../../types/forms';
import { ManageJiraIntegrationSecret } from './index';

test('renders ManageJiraIntegrationSecret Edit component', () => {
    render(
        <TestWrapper>
            <ManageJiraIntegrationSecret
                formData={{
                    jiraServer: {
                        apiVersion: 'v2.edp.epam.com/v1',
                        kind: 'JiraServer',
                        // @ts-ignore
                        metadata: {
                            name: 'test-jira',
                            namespace: 'test-namespace',
                        },
                        // @ts-ignore
                        status: {
                            available: true,
                            status: 'finished',
                        },
                    },
                    jiraServerSecret: {
                        // @ts-ignore
                        metadata: {
                            name: INTEGRATION_SECRET_NAMES.JIRA,
                            uid: 'test-uid',
                            labels: {
                                'app.edp.epam.com/secret-type': 'jira',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'apiVersion',
                                    kind: 'ExternalSecret',
                                    name: INTEGRATION_SECRET_NAMES.JIRA,
                                    uid: 'test-uid',
                                    controller: true,
                                    blockOwnerDeletion: true,
                                },
                            ],
                        },
                        immutable: false,
                        data: {
                            username: 'dGVzdC11c2Vy',
                            password: 'dGVzdC1wYXNzd29yZA==',
                        },
                        type: 'Opaque',
                    },
                    mode: FORM_MODES.EDIT,
                    handleClosePanel: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
