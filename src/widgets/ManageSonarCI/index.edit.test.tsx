/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SYSTEM_QUICK_LINKS } from '../../k8s/QuickLink/constants';
import { SonarCISecretMock } from '../../k8s/Secret/mocks/sonar-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageSonarCI } from './index';

test('renders ManageSonarCI Edit component', () => {
  render(
    <TestWrapper>
      <ManageSonarCI
        formData={{
          sonarSecret: SonarCISecretMock as unknown as SecretKubeObjectInterface,
          sonarQuickLink: {
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
              url: 'https://test-nexus.com',
              visible: true,
              icon: '',
            },
            status: '',
          },
          ownerReference: undefined,
          mode: FORM_MODES.EDIT,
          handleClosePanel: jest.fn(),
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
