/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageClusterSecret } from './index';

test('renders ManageClusterSecret Edit component', () => {
    render(
        <TestWrapper>
            <ManageClusterSecret
                formData={{
                    currentElement: {
                        apiVersion: 'v1',
                        kind: 'Secret',
                        // @ts-ignore
                        metadata: {
                            name: 'test-cluster-name',
                            labels: { 'argocd.argoproj.io/secret-type': 'cluster' },
                        },
                        type: 'Opaque',
                        data: {
                            name: 'dGVzdC1jbHVzdGVyLW5hbWU=',
                            server: 'dGVzdC1jbHVzdGVyLWhvc3Q=',
                            config: 'eyJ0bHNDbGllbnRDb25maWciOnsiaW5zZWN1cmUiOmZhbHNlLCJjYURhdGEiOiJ0ZXN0LWNsdXN0ZXItY2VydGlmaWNhdGUifSwiYmVhcmVyVG9rZW4iOiJ0ZXN0LWNsdXN0ZXItdG9rZW4ifQ==',
                        },
                    },
                    handleDeleteRow: jest.fn(),
                }}
            />
        </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
});
