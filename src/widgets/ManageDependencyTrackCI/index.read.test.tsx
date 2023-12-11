/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
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
                    isReadOnly: !!ownerReference,
                    mode: FORM_MODES.EDIT,
                    handleClosePanel: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
