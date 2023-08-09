/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageSonarIntegrationSecret } from './index';

test('renders ManageSonarIntegrationSecret Edit component', () => {
    render(
        <TestWrapper>
            <ManageSonarIntegrationSecret
                formData={{
                    currentElement: {
                        // @ts-ignore
                        metadata: {
                            name: 'sonar-ciuser-token',
                            uid: 'test-uid',
                            labels: {
                                'app.edp.epam.com/secret-type': 'sonar',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'apiVersion',
                                    kind: 'ExternalSecret',
                                    name: 'sonar-ciuser-token',
                                    uid: 'test-uid',
                                    controller: true,
                                    blockOwnerDeletion: true,
                                },
                            ],
                        },
                        immutable: false,
                        data: {
                            secret: 'dGVzdC1wYXNzd29yZA==',
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
