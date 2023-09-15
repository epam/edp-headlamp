/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { INTEGRATION_SECRET_NAMES } from '../../k8s/Secret/constants';
import { ManageNexusIntegrationSecret } from './index';

test('renders ManageNexusIntegrationSecret Edit component', () => {
    render(
        <TestWrapper>
            <ManageNexusIntegrationSecret
                formData={{
                    currentElement: {
                        // @ts-ignore
                        metadata: {
                            name: INTEGRATION_SECRET_NAMES.NEXUS,
                            uid: 'test-uid',
                            labels: {
                                'app.edp.epam.com/secret-type': 'nexus',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'apiVersion',
                                    kind: 'ExternalSecret',
                                    name: INTEGRATION_SECRET_NAMES.NEXUS,
                                    uid: 'test-uid',
                                    controller: true,
                                    blockOwnerDeletion: true,
                                },
                            ],
                        },
                        immutable: false,
                        data: {
                            password: 'dGVzdC1wYXNzd29yZA==',
                            username: 'dGVzdC11c2VybmFtZQ==',
                            url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
                        },
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
