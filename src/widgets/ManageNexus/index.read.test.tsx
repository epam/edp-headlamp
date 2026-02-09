/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { NexusCISecretWithOwnerMock } from '../../k8s/groups/default/Secret/mocks/nexus-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { SYSTEM_QUICK_LINKS } from '../../k8s/groups/EDP/QuickLink/constants';
import { DEFAULT_ALLOWED_REASON } from '../../providers/Permissions/constants';
import { FORM_MODES } from '../../types/forms';
import { ManageNexus } from './index';

test('renders ManageNexus Edit component (read-only)', () => {
  const ownerReference = NexusCISecretWithOwnerMock.metadata.ownerReferences[0].kind;

  render(
    <TestWrapper>
      <ManageNexus
        secret={NexusCISecretWithOwnerMock as unknown as SecretKubeObjectInterface}
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
            type: 'system',
            url: 'https://test-nexus.com',
            visible: true,
            icon: '',
          },
        }}
        ownerReference={ownerReference}
        mode={FORM_MODES.EDIT}
        handleClosePanel={jest.fn()}
        permissions={{
          create: {
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
          update: {
            QuickLink: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
          delete: {
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
