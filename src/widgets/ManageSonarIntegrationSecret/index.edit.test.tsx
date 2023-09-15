/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { INTEGRATION_SECRET_NAMES } from '../../k8s/Secret/constants';
import { ManageSonarIntegrationSecret } from './index';

test('renders ManageSonarIntegrationSecret Edit component', () => {
    render(
        <TestWrapper>
            <ManageSonarIntegrationSecret
                formData={{
                    currentElement: {
                        // @ts-ignore
                        metadata: {
                            name: INTEGRATION_SECRET_NAMES.SONAR,
                            uid: 'test-uid',
                            labels: {
                                'app.edp.epam.com/secret-type': 'sonar',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'apiVersion',
                                    kind: 'ExternalSecret',
                                    name: INTEGRATION_SECRET_NAMES.SONAR,
                                    uid: 'test-uid',
                                    controller: true,
                                    blockOwnerDeletion: true,
                                },
                            ],
                        },
                        immutable: false,
                        data: {
                            token: 'dGVzdC10b2tlbg==',
                            url: 'dGVzdC11cmw=',
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
