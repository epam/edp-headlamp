/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { INTEGRATION_SECRET_NAMES } from '../../k8s/Secret/constants';
import { ManageDependencyTrackIntegrationSecret } from './index';

test('renders ManageDependencyTrackIntegrationSecret Edit component', () => {
    render(
        <TestWrapper>
            <ManageDependencyTrackIntegrationSecret
                formData={{
                    currentElement: {
                        // @ts-ignore
                        metadata: {
                            name: INTEGRATION_SECRET_NAMES.DEPENDENCY_TRACK,
                            uid: 'test-uid',
                            labels: {
                                'app.edp.epam.com/secret-type': 'dependency-track',
                            },
                            ownerReferences: [
                                {
                                    apiVersion: 'apiVersion',
                                    kind: 'ExternalSecret',
                                    name: INTEGRATION_SECRET_NAMES.DEPENDENCY_TRACK,
                                    uid: 'test-uid',
                                    controller: true,
                                    blockOwnerDeletion: true,
                                },
                            ],
                        },
                        immutable: false,
                        data: { token: 'dGVzdC10b2tlbg==', url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=' },
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
