/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageGitOps } from './index';

test('renders ManageGitOps Edit component', () => {
    render(
        <TestWrapper>
            <ManageGitOps
                formData={{
                    currentElement: {
                        apiVersion: 'v2.edp.epam.com/v1',
                        kind: 'Codebase',
                        // @ts-ignore
                        metadata: {
                            labels: {
                                'app.edp.epam.com/codebaseType': 'system',
                            },
                            name: 'edp-gitops',
                            namespace: 'edp-delivery-vp-dev',
                        },
                        // @ts-ignore
                        spec: {
                            buildTool: 'helm',
                            ciTool: 'tekton',
                            defaultBranch: 'main',
                            deploymentScript: 'helm-chart',
                            description: 'Custom values for deploy applications',
                            emptyProject: false,
                            framework: 'gitops',
                            gitServer: 'gerrit',
                            gitUrlPath: '/edp-gitops',
                            jenkinsSlave: null,
                            jiraIssueMetadataPayload: null,
                            jobProvisioning: null,
                            lang: 'helm',
                            strategy: 'create',
                            ticketNamePattern: null,
                            type: 'system',
                            versioning: {
                                startFrom: '0.1.0-SNAPSHOT',
                                type: 'edp',
                            },
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
