/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import {
    CONTAINER_REGISTRY_PLATFORM,
    CONTAINER_REGISTRY_TYPE,
} from '../../k8s/ConfigMap/constants';
import { createEdpConfigMapMock } from '../../k8s/ConfigMap/mocks/edp-config-map.mock';
import { ConfigMapKubeObjectInterface } from '../../k8s/ConfigMap/types';
import { kanikoDockerSecretWithOwnerMock } from '../../k8s/Secret/mocks/kaniko-config-secret.mock';
import { regcredSecretWithOwnerMock } from '../../k8s/Secret/mocks/regcred-config-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { ManageRegistry } from './index';

test('renders ManageRegistry Kubernetes Edit (read-only) component', () => {
    render(
        <TestWrapper>
            <ManageRegistry
                formData={{
                    EDPConfigMap: createEdpConfigMapMock(
                        CONTAINER_REGISTRY_TYPE.HARBOR,
                        CONTAINER_REGISTRY_PLATFORM.KUBERNETES
                    ) as unknown as ConfigMapKubeObjectInterface,
                    pullAccountSecret:
                        regcredSecretWithOwnerMock as unknown as SecretKubeObjectInterface,
                    pushAccountSecret:
                        kanikoDockerSecretWithOwnerMock as unknown as SecretKubeObjectInterface,
                    tektonServiceAccount: null,
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});