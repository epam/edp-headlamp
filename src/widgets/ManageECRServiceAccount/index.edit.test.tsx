/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageECRServiceAccount } from './index';

test('renders ManageECRServiceAccount Edit component', () => {
    render(
        <TestWrapper>
            <ManageECRServiceAccount
                formData={{
                    currentElement: {
                        apiVersion: 'v1',
                        kind: 'ServiceAccount',
                        // @ts-ignore
                        metadata: {
                            name: 'test-ecr-service-account',
                            namespace: 'test-namespace',
                            annotations: {
                                'eks.amazonaws.com/role-arn': 'test-arn-aws-role',
                            },
                        },
                    },
                    handleDeleteRow: jest.fn(),
                    registryEndpoint: 'test-registry-endpoint',
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
