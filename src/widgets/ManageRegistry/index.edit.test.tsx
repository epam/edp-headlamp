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
import {
  ECRPushSecretMock,
  kanikoDockerSecretWithOwnerMock,
  openshiftPushSecretMock,
} from '../../k8s/Secret/mocks/kaniko-config-secret.mock';
import { regcredSecretWithOwnerMock } from '../../k8s/Secret/mocks/regcred-config-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { tektonServiceAccountMock } from '../../k8s/ServiceAccount/mocks/tekton.mock';
import { ServiceAccountKubeObjectInterface } from '../../k8s/ServiceAccount/types';
import { ManageRegistry } from './index';

describe('testing ManageRegistry Edit', () => {
  test('renders ManageRegistry component with ECR EDPConfig map, service account', () => {
    render(
      <TestWrapper>
        <ManageRegistry
          EDPConfigMap={
            createEdpConfigMapMock(
              CONTAINER_REGISTRY_TYPE.ECR,
              CONTAINER_REGISTRY_PLATFORM.KUBERNETES
            ) as unknown as ConfigMapKubeObjectInterface
          }
          pushAccountSecret={ECRPushSecretMock as unknown as SecretKubeObjectInterface}
          pullAccountSecret={undefined}
          tektonServiceAccount={
            tektonServiceAccountMock as unknown as ServiceAccountKubeObjectInterface
          }
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageRegistry component with Harbor EDPConfig map', () => {
    // similar to nexus
    render(
      <TestWrapper>
        <ManageRegistry
          EDPConfigMap={
            createEdpConfigMapMock(
              CONTAINER_REGISTRY_TYPE.HARBOR,
              CONTAINER_REGISTRY_PLATFORM.KUBERNETES
            ) as unknown as ConfigMapKubeObjectInterface
          }
          pushAccountSecret={undefined}
          pullAccountSecret={undefined}
          tektonServiceAccount={undefined}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageRegistry component with DockerHub EDPConfig map', () => {
    render(
      <TestWrapper>
        <ManageRegistry
          EDPConfigMap={
            createEdpConfigMapMock(
              CONTAINER_REGISTRY_TYPE.DOCKER_HUB,
              CONTAINER_REGISTRY_PLATFORM.KUBERNETES
            ) as unknown as ConfigMapKubeObjectInterface
          }
          pushAccountSecret={undefined}
          pullAccountSecret={undefined}
          tektonServiceAccount={undefined}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageRegistry component with GHCR EDPConfig map', () => {
    render(
      <TestWrapper>
        <ManageRegistry
          EDPConfigMap={
            createEdpConfigMapMock(
              CONTAINER_REGISTRY_TYPE.GHCR,
              CONTAINER_REGISTRY_PLATFORM.KUBERNETES
            ) as unknown as ConfigMapKubeObjectInterface
          }
          pushAccountSecret={undefined}
          pullAccountSecret={undefined}
          tektonServiceAccount={undefined}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageRegistry component with Openshift registry EDPConfig map', () => {
    render(
      <TestWrapper>
        <ManageRegistry
          EDPConfigMap={
            createEdpConfigMapMock(
              CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY,
              CONTAINER_REGISTRY_PLATFORM.OPENSHIFT
            ) as unknown as ConfigMapKubeObjectInterface
          }
          pushAccountSecret={openshiftPushSecretMock as unknown as SecretKubeObjectInterface}
          pullAccountSecret={undefined}
          tektonServiceAccount={undefined}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageRegistry component with Harbor EDPConfig map, push/pull secrets', () => {
    // similar to nexus
    render(
      <TestWrapper>
        <ManageRegistry
          EDPConfigMap={
            createEdpConfigMapMock(
              CONTAINER_REGISTRY_TYPE.HARBOR,
              CONTAINER_REGISTRY_PLATFORM.KUBERNETES
            ) as unknown as ConfigMapKubeObjectInterface
          }
          pushAccountSecret={
            kanikoDockerSecretWithOwnerMock as unknown as SecretKubeObjectInterface
          }
          pullAccountSecret={regcredSecretWithOwnerMock as unknown as SecretKubeObjectInterface}
          tektonServiceAccount={undefined}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageRegistry component with DockerHub EDPConfig map, push/pull secrets', () => {
    render(
      <TestWrapper>
        <ManageRegistry
          EDPConfigMap={
            createEdpConfigMapMock(
              CONTAINER_REGISTRY_TYPE.DOCKER_HUB,
              CONTAINER_REGISTRY_PLATFORM.KUBERNETES
            ) as unknown as ConfigMapKubeObjectInterface
          }
          pushAccountSecret={
            kanikoDockerSecretWithOwnerMock as unknown as SecretKubeObjectInterface
          }
          pullAccountSecret={regcredSecretWithOwnerMock as unknown as SecretKubeObjectInterface}
          tektonServiceAccount={undefined}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });
});
