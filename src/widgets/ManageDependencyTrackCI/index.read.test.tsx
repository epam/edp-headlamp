/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SYSTEM_EDP_COMPONENTS } from '../../k8s/EDPComponent/constants';
import { DependencyTrackCISecretWithOwnerMock } from '../../k8s/Secret/mocks/dependencytrack-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageDependencyTrackCI } from './index';

test('renders ManageDependencyTrackCI Edit component (read-only)', () => {
    const ownerReference = DependencyTrackCISecretWithOwnerMock.metadata.ownerReferences[0].kind;

    render(
        <TestWrapper>
            <ManageDependencyTrackCI
                formData={{
                    dependencyTrackSecret:
                        DependencyTrackCISecretWithOwnerMock as unknown as SecretKubeObjectInterface,
                    ownerReference: ownerReference,
                    depTrackEDPComponent: {
                        apiVersion: 'v1.edp.epam.com/v1',
                        kind: 'EDPComponent',
                        metadata: {
                            name: SYSTEM_EDP_COMPONENTS.DEPENDENCY_TRACK,
                            namespace: 'test-namespace',
                            creationTimestamp: '',
                            uid: '',
                        },
                        spec: {
                            type: SYSTEM_EDP_COMPONENTS.DEPENDENCY_TRACK,
                            url: 'https://test-nexus.com',
                            visible: true,
                            icon: '',
                        },
                        status: '',
                    },
                    mode: FORM_MODES.EDIT,
                    handleClosePanel: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
