/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { CONTAINER_REGISTRY_PLATFORM } from '../../k8s/ConfigMap/constants';
import { createEmptyEdpConfigMapMock } from '../../k8s/ConfigMap/mocks/edp-config-map.mock';
import { ConfigMapKubeObjectInterface } from '../../k8s/ConfigMap/types';
import { ManageRegistry } from './index';

test('renders ManageRegistry Kubernetes Create component', () => {
  render(
    <TestWrapper>
      <ManageRegistry
        formData={{
          EDPConfigMap: createEmptyEdpConfigMapMock(
            CONTAINER_REGISTRY_PLATFORM.KUBERNETES
          ) as unknown as ConfigMapKubeObjectInterface,
          pullAccountSecret: null,
          pushAccountSecret: null,
          tektonServiceAccount: null,
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
