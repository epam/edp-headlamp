/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DefectDojoCISecretWithOwnerMock } from '../../k8s/groups/default/Secret/mocks/defectdojo-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { SYSTEM_QUICK_LINKS } from '../../k8s/groups/EDP/QuickLink/constants';
import { DEFAULT_ALLOWED_REASON } from '../../providers/Permissions/constants';
import { FORM_MODES } from '../../types/forms';
import { ManageDefectDojo } from './index';

test('renders ManageDefectDojo Edit component (read-only)', () => {
  const ownerReference = DefectDojoCISecretWithOwnerMock.metadata.ownerReferences[0].kind;
  render(
    <TestWrapper>
      <ManageDefectDojo
        secret={DefectDojoCISecretWithOwnerMock as unknown as SecretKubeObjectInterface}
        quickLink={{
          apiVersion: 'v1.edp.epam.com/v1',
          kind: 'QuickLink',
          metadata: {
            name: SYSTEM_QUICK_LINKS.DEFECT_DOJO,
            namespace: 'test-namespace',
            creationTimestamp: '',
            uid: '',
          },
          spec: {
            type: 'system',
            url: 'https://test-defectdojo.com',
            visible: true,
            icon: '',
          },
        }}
        ownerReference={ownerReference}
        mode={FORM_MODES.EDIT}
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
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
