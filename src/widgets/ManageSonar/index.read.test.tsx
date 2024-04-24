/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SYSTEM_QUICK_LINKS } from '../../k8s/QuickLink/constants';
import { SonarCISecretWithOwnerMock } from '../../k8s/Secret/mocks/sonar-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageSonar } from './index';

test('renders ManageSonar Edit component (read-only)', () => {
  const ownerReference = SonarCISecretWithOwnerMock.metadata.ownerReferences[0].kind;
  render(
    <TestWrapper>
      <ManageSonar
        secret={SonarCISecretWithOwnerMock as unknown as SecretKubeObjectInterface}
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
        ownerReference={ownerReference}
        mode={FORM_MODES.EDIT}
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
