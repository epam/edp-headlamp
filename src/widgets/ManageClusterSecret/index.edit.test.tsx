/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DEFAULT_ALLOWED_REASON } from '../../providers/Permissions/constants';
import { FORM_MODES } from '../../types/forms';
import { ManageClusterSecret } from './index';

test('renders ManageClusterSecret Edit component', () => {
  render(
    <TestWrapper>
      <ManageClusterSecret
        formData={{
          currentElement: {
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
              name: 'test-cluster-name',
              labels: { 'argocd.argoproj.io/secret-type': 'cluster' },
              creationTimestamp: '',
              uid: '',
            },
            data: {
              config:
                'eyJhcGlWZXJzaW9uIjoidjEiLCJraW5kIjoiQ29uZmlnIiwiY3VycmVudC1jb250ZXh0IjoiZGVmYXVsdC1jb250ZXh0IiwicHJlZmVyZW5jZXMiOnt9LCJjbHVzdGVycyI6W3siY2x1c3RlciI6eyJzZXJ2ZXIiOiJ0ZXN0LWNsdXN0ZXItaG9zdCJ9LCJuYW1lIjoiZGVmYXVsdC1jbHVzdGVyIn1dLCJjb250ZXh0cyI6W3siY29udGV4dCI6eyJjbHVzdGVyIjoiZGVmYXVsdC1jbHVzdGVyIiwidXNlciI6ImRlZmF1bHQtdXNlciJ9LCJuYW1lIjoiZGVmYXVsdC1jb250ZXh0In1dLCJ1c2VycyI6W3sidXNlciI6eyJ0b2tlbiI6InRlc3QtY2x1c3Rlci10b2tlbiJ9LCJuYW1lIjoiZGVmYXVsdC11c2VyIn1dfQ==',
            },
          },
          ownerReference: 'ExternalSecret',
          mode: FORM_MODES.EDIT,
          permissions: {
            create: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            update: {
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
          },
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
