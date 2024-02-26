/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SYSTEM_QUICK_LINKS } from '../../k8s/QuickLink/constants';
import { NexusCISecretMock } from '../../k8s/Secret/mocks/nexus-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageNexusCI } from './index';

test('renders ManageNexusCI Edit component', () => {
  render(
    <TestWrapper>
      <ManageNexusCI
        formData={{
          nexusSecret: NexusCISecretMock as unknown as SecretKubeObjectInterface,
          ownerReference: undefined,
          nexusQuickLink: {
            apiVersion: 'v1.edp.epam.com/v1',
            kind: 'QuickLink',
            metadata: {
              name: SYSTEM_QUICK_LINKS.NEXUS,
              namespace: 'test-namespace',
              creationTimestamp: '',
              uid: '',
            },
            spec: {
              type: SYSTEM_QUICK_LINKS.NEXUS,
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
