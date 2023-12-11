/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DependencyTrackCISecretMock } from '../../k8s/Secret/mocks/dependencytrack-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageDependencyTrackCI } from './index';

test('renders ManageDependencyTrackCI Edit component', () => {
    render(
        <TestWrapper>
            <ManageDependencyTrackCI
                formData={{
                    dependencyTrackSecret:
                        DependencyTrackCISecretMock as unknown as SecretKubeObjectInterface,
                    ownerReference: undefined,
                    isReadOnly: false,
                    mode: FORM_MODES.EDIT,
                    handleClosePanel: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
