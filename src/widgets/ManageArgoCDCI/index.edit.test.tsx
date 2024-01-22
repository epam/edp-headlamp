/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SYSTEM_EDP_COMPONENTS } from '../../k8s/EDPComponent/constants';
import { ArgoCDCISecretMock } from '../../k8s/Secret/mocks/argo-cd-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageArgoCDCI } from './index';

test('renders ManageArgoCDCI Edit component', () => {
    render(
        <TestWrapper>
            <ManageArgoCDCI
                formData={{
                    argoCDSecret: ArgoCDCISecretMock as unknown as SecretKubeObjectInterface,
                    ownerReference: undefined,
                    argoCDEDPComponent: {
                        apiVersion: 'v1.edp.epam.com/v1',
                        kind: 'EDPComponent',
                        metadata: {
                            name: SYSTEM_EDP_COMPONENTS.ARGOCD,
                            namespace: 'test-namespace',
                            creationTimestamp: '',
                            uid: '',
                        },
                        spec: {
                            type: SYSTEM_EDP_COMPONENTS.ARGOCD,
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
