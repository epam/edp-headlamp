/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SYSTEM_EDP_COMPONENTS } from '../../k8s/EDPComponent/constants';
import { SonarCISecretWithOwnerMock } from '../../k8s/Secret/mocks/sonar-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageSonarCI } from './index';

test('renders ManageSonarCI Edit component (read-only)', () => {
  const ownerReference = SonarCISecretWithOwnerMock.metadata.ownerReferences[0].kind;

  render(
    <TestWrapper>
      <ManageSonarCI
        formData={{
          sonarSecret: SonarCISecretWithOwnerMock as unknown as SecretKubeObjectInterface,
          ownerReference: ownerReference,
          sonarEDPComponent: {
            apiVersion: 'v1.edp.epam.com/v1',
            kind: 'EDPComponent',
            metadata: {
              name: SYSTEM_EDP_COMPONENTS.SONAR,
              namespace: 'test-namespace',
              creationTimestamp: '',
              uid: '',
            },
            spec: {
              type: SYSTEM_EDP_COMPONENTS.SONAR,
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
