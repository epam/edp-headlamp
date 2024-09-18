/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SonarCISecretMock } from '../../k8s/groups/default/Secret/mocks/sonar-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { SYSTEM_QUICK_LINKS } from '../../k8s/groups/EDP/QuickLink/constants';
import { FORM_MODES } from '../../types/forms';
import { ManageSonar } from './index';

test('renders ManageSonar Edit component', () => {
  render(
    <TestWrapper>
      <ManageSonar
        secret={SonarCISecretMock as unknown as SecretKubeObjectInterface}
        quickLink={{
          apiVersion: 'v1.edp.epam.com/v1',
          kind: 'QuickLink',
          metadata: {
            name: SYSTEM_QUICK_LINKS.SONAR,
            namespace: 'test-namespace',
            creationTimestamp: '',
            uid: '',
          },
          spec: {
            type: SYSTEM_QUICK_LINKS.SONAR,
            url: 'https://test-sonar.com',
            visible: true,
            icon: '',
          },
          status: '',
        }}
        ownerReference={null}
        mode={FORM_MODES.EDIT}
        permissions={{
          create: {
            Secret: {
              allowed: true,
            },
          },
          update: {
            QuickLink: {
              allowed: true,
            },
            Secret: {
              allowed: true,
            },
          },
          delete: {
            Secret: {
              allowed: true,
            },
          },
        }}
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
