/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SYSTEM_EDP_COMPONENTS } from '../../k8s/EDPComponent/constants';
import { DefectDojoCISecretWithOwnerMock } from '../../k8s/Secret/mocks/defectdojo-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageDefectDojoCI } from './index';

test('renders ManageDefectDojoCI Edit component (read-only)', () => {
  const ownerReference = DefectDojoCISecretWithOwnerMock.metadata.ownerReferences[0].kind;

  render(
    <TestWrapper>
      <ManageDefectDojoCI
        formData={{
          defectDojoSecret: DefectDojoCISecretWithOwnerMock as unknown as SecretKubeObjectInterface,
          ownerReference: ownerReference,
          defectDojoEDPComponent: {
            apiVersion: 'v1.edp.epam.com/v1',
            kind: 'EDPComponent',
            metadata: {
              name: SYSTEM_EDP_COMPONENTS.DEFECT_DOJO,
              namespace: 'test-namespace',
              creationTimestamp: '',
              uid: '',
            },
            spec: {
              type: SYSTEM_EDP_COMPONENTS.DEFECT_DOJO,
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
