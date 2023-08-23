/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageDependencyTrackIntegrationSecret } from './index';

test('renders ManageDependencyTrackIntegrationSecret Edit component', () => {
    render(
        <TestWrapper>
            <ManageDependencyTrackIntegrationSecret
                formData={{
                    currentElement: {
                        // @ts-ignore
                        metadata: {
                            name: 'ci-dependency-track',
                            uid: 'test-uid',
                            labels: {
                                'app.edp.epam.com/secret-type': 'dependency-track',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'apiVersion',
                                    kind: 'ExternalSecret',
                                    name: 'ci-dependency-track',
                                    uid: 'test-uid',
                                    controller: true,
                                    blockOwnerDeletion: true,
                                },
                            ],
                        },
                        immutable: false,
                        data: { token: 'dGVzdC10b2tlbg==' },
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
