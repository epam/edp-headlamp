/**
 * @jest-environment jsdom
 */

import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../../mocks/wrappers/default';
import { DeleteKubeObjectDialog } from './index';

test('renders DeleteKubeObjectDialog component', () => {
  render(
    <TestWrapper>
      <DeleteKubeObjectDialog
        props={{
          onSuccess: jest.fn(),
          objectName: 'MockObjectName',
          kubeObjectData: {
            kind: 'MockKind',
          } as KubeObjectInterface,
          kubeObject: {},
          onBeforeSubmit: jest.fn(),
          description: 'Mock Description',
        }}
        state={{
          open: true,
          openDialog: jest.fn(),
          closeDialog: jest.fn(),
        }}
      />
    </TestWrapper>
  );

  // Check that the component is rendered
  const dialog = screen.getByTestId('dialog');
  expect(dialog).toMatchSnapshot();
});
