/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { INTEGRATION_SECRET_NAMES } from '../../k8s/Secret/constants';
import { ManageSSOIntegrationSecret } from './index';

test('renders ManageSSOIntegrationSecret Edit component', () => {
    render(
        <TestWrapper>
            <ManageSSOIntegrationSecret
                formData={{
                    currentElement: {
                        // @ts-ignore
                        metadata: {
                            name: INTEGRATION_SECRET_NAMES.SSO,
                            uid: 'test-uid',
                            labels: {
                                'app.edp.epam.com/secret-type': 'keycloak',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'apiVersion',
                                    kind: 'ExternalSecret',
                                    name: INTEGRATION_SECRET_NAMES.SSO,
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
