/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DependencyTrackCISecretMock } from '../../k8s/groups/default/Secret/mocks/dependencytrack-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { SYSTEM_QUICK_LINKS } from '../../k8s/groups/EDP/QuickLink/constants';
import { FORM_MODES } from '../../types/forms';
import { ManageDependencyTrack } from './index';

test('renders ManageDependencyTrack Edit component', () => {
  render(
    <TestWrapper>
      <ManageDependencyTrack
        secret={DependencyTrackCISecretMock as unknown as SecretKubeObjectInterface}
        quickLink={{
          apiVersion: 'v1.edp.epam.com/v1',
          kind: 'QuickLink',
          metadata: {
            name: SYSTEM_QUICK_LINKS.DEPENDENCY_TRACK,
            namespace: 'test-namespace',
            creationTimestamp: '',
            uid: '',
          },
          spec: {
            type: SYSTEM_QUICK_LINKS.DEPENDENCY_TRACK,
            url: 'https://test-deptrack.com',
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
