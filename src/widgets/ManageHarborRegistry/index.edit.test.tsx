/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageHarborRegistry } from './index';

test('renders ManageHarborRegistry Edit component', () => {
    render(
        <TestWrapper>
            <ManageHarborRegistry
                formData={{
                    currentElement: {
                        // @ts-ignore
                        metadata: {
                            name: 'kaniko-docker-config',
                            uid: 'test-uid',
                            labels: {
                                'app.edp.epam.com/secret-type': 'registry',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'apiVersion',
                                    kind: 'ExternalSecret',
                                    name: 'kaniko-docker-config',
                                    uid: 'test-uid',
                                    controller: true,
                                    blockOwnerDeletion: true,
                                },
                            ],
                        },
                        immutable: false,
                        data: {
                            '.dockerconfigjson':
                                'eyJhdXRocyI6eyJ0ZXN0LXJlZ2lzdHJ5LWVuZHBvaW50Ijp7ImF1dGgiOiJ0ZXN0LWF1dGgiLCJwYXNzd29yZCI6ImRHVnpkQzF3WVhOemQyOXlaQT09IiwidXNlcm5hbWUiOiJ0ZXN0LXVzZXJuYW1lIn19fQ==',
                        },
                        type: 'kubernetes.io/dockerconfigjson',
                    },
                    handleDeleteRow: jest.fn(),
                    registryEndpoint: 'test-registry-endpoint',
                    secrets: [
                        {
                            // @ts-ignore
                            metadata: {
                                name: 'kaniko-docker-config',
                                uid: 'test-uid',
                                labels: {
                                    'app.edp.epam.com/secret-type': 'registry',
                                },
                                ownerReferences: [
                                    {
                                        apiVersion: 'apiVersion',
                                        kind: 'ExternalSecret',
                                        name: 'kaniko-docker-config',
                                        uid: 'test-uid',
                                        controller: true,
                                        blockOwnerDeletion: true,
                                    },
                                ],
                            },
                            immutable: false,
                            data: {
                                '.dockerconfigjson':
                                    'eyJhdXRocyI6eyJ0ZXN0LXJlZ2lzdHJ5LWVuZHBvaW50Ijp7ImF1dGgiOiJ0ZXN0LWF1dGgiLCJwYXNzd29yZCI6ImRHVnpkQzF3WVhOemQyOXlaQT09IiwidXNlcm5hbWUiOiJ0ZXN0LXVzZXJuYW1lIn19fQ==',
                            },
                            type: 'kubernetes.io/dockerconfigjson',
                        },
                        {
                            // @ts-ignore
                            metadata: {
                                name: 'regcred',
                                uid: 'test-uid',
                                labels: {
                                    'app.edp.epam.com/secret-type': 'registry',
                                },
                                ownerReferences: [
                                    {
                                        apiVersion: 'apiVersion',
                                        kind: 'ExternalSecret',
                                        name: 'kaniko-docker-config',
                                        uid: 'test-uid',
                                        controller: true,
                                        blockOwnerDeletion: true,
                                    },
                                ],
                            },
                            immutable: false,
                            data: {
                                '.dockerconfigjson':
                                    'eyJhdXRocyI6eyJ0ZXN0LXJlZ2lzdHJ5LWVuZHBvaW50Ijp7ImF1dGgiOiJ0ZXN0LWF1dGgiLCJwYXNzd29yZCI6ImRHVnpkQzF3WVhOemQyOXlaQT09IiwidXNlcm5hbWUiOiJ0ZXN0LXVzZXJuYW1lIn19fQ==',
                            },
                            type: 'kubernetes.io/dockerconfigjson',
                        },
                    ],
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
