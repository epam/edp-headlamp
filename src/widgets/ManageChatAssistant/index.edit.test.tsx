/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { SYSTEM_QUICK_LINKS } from '../../k8s/groups/EDP/QuickLink/constants';
import { FORM_MODES } from '../../types/forms';
import { ManageChatAssistant } from './index';

const mock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'ci-codemie',
    labels: {
      'app.edp.epam.com/secret-type': 'chat-assistant',
      'app.edp.epam.com/integration-secret': 'true',
    },
  },
  type: 'Opaque',
  data: {
    apiUrl: 'aHR0cHM6Ly9hcGktdXJsLmNvbQ==',
    assistantId: 'YXNzaXN0YW50LWlk',
    token: 'dGVzdC10b2tlbg==',
  },
};

test('renders ManageChatAssistant Edit component', () => {
  render(
    <TestWrapper>
      <ManageChatAssistant
        secret={mock as unknown as SecretKubeObjectInterface}
        quickLink={{
          apiVersion: 'v1.edp.epam.com/v1',
          kind: 'QuickLink',
          metadata: {
            name: SYSTEM_QUICK_LINKS.CODEMIE,
            namespace: 'test-namespace',
            creationTimestamp: '',
            uid: '',
          },
          spec: {
            type: SYSTEM_QUICK_LINKS.CODEMIE,
            url: 'https://test-codemie.com',
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
