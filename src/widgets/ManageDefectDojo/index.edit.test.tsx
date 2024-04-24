/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SYSTEM_QUICK_LINKS } from '../../k8s/QuickLink/constants';
import { DefectDojoCISecretMock } from '../../k8s/Secret/mocks/defectdojo-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageDefectDojo } from './index';

test('renders ManageDefectDojo Edit component', () => {
  render(
    <TestWrapper>
      <ManageDefectDojo
        secret={DefectDojoCISecretMock as unknown as SecretKubeObjectInterface}
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
            type: SYSTEM_QUICK_LINKS.DEFECT_DOJO,
            url: 'https://test-defectdojo.com',
            visible: true,
            icon: '',
          },
          status: '',
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
