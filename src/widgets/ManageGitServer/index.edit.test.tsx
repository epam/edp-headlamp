/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageGitServer } from './index';

test('renders ManageGitServer Edit component', () => {
    render(
        <TestWrapper>
            <ManageGitServer
                formData={{
                    mode: FORM_MODES.EDIT,
                    gitServer: {
                        apiVersion: 'v2.edp.epam.com/v1',
                        kind: 'GitServer',
                        // @ts-ignore
                        metadata: { name: 'gitlab.com-8ygse' },
                        spec: {
                            gitHost: 'test-githost.com',
                            nameSshKeySecret: 'ci-gitlab',
                            sshPort: 22,
                            httpsPort: 443,
                            gitUser: 'git',
                            gitProvider: 'gitlab',
                        },
                    },
                    gitServerSecret: {
                        // @ts-ignore
                        metadata: {
                            name: 'ci-gitlab',
                            namespace: 'test-namespace',
                            labels: {
                                'app.kubernetes.io/managed-by': 'Helm',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'external-secrets.io/v1beta1',
                                    kind: 'ExternalSecret',
                                    name: 'ci-gitlab',
                                    uid: 'c2579e7a-2638-40fd-9ef6-be034067cc74',
                                    controller: true,
                                    blockOwnerDeletion: true,
                                },
                            ],
                        },
                        immutable: false,
                        data: {
                            id_rsa: 'dGVzdC1pZC1yc2E=',
                            token: 'dGVzdC10b2tlbg==',
                        },
                        type: 'Opaque',
                    },
                    handleClosePanel: () => {
                        //
                    },
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
