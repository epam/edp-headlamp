/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { NexusCISecretMock } from '../../k8s/groups/default/Secret/mocks/nexus-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { SYSTEM_QUICK_LINKS } from '../../k8s/groups/EDP/QuickLink/constants';
import { FORM_MODES } from '../../types/forms';
import { ManageNexus } from './index';

test('renders ManageNexus Edit component', () => {
  render(
    <TestWrapper>
      <ManageNexus
        secret={NexusCISecretMock as unknown as SecretKubeObjectInterface}
        quickLink={{
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
        }}
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
        ownerReference={null}
        mode={FORM_MODES.EDIT}
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
