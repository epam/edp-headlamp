/**
 * @jest-environment jsdom
 */

import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DeleteKubeObject } from './index';
import { DeleteKubeObjectDialogForwardedProps } from './types';

const mockForwardedProps: DeleteKubeObjectDialogForwardedProps = {
    onSuccess: jest.fn(),
    objectName: 'MockObjectName',
    kubeObjectData: {
        kind: 'MockKind',
    } as KubeObjectInterface,
    kubeObject: {},
    onBeforeSubmit: jest.fn(),
    description: 'Mock Description',
};

jest.mock('../../providers/Dialog/hooks', () => ({
    useSpecificDialogContext: jest.fn(() => ({
        open: true,
        forwardedProps: mockForwardedProps,
        closeDialog: jest.fn(),
        openDialog: jest.fn(),
    })),
}));

test('renders DeleteKubeObject component', () => {
    render(
        <TestWrapper>
            <DeleteKubeObject />
        </TestWrapper>
    );

    // Check that the component is rendered
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toMatchSnapshot();
});
