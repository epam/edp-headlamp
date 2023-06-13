/**
 * @jest-environment jsdom
 */

import { describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { CreateCodebaseBranch } from './index';
import { CreateCodebaseBranchProps } from './types';

describe('CreateCodebaseBranch', () => {
    it('should render correctly', async () => {
        const props: CreateCodebaseBranchProps = {
            codebaseData: {
                apiVersion: 'apiVersion',
                kind: 'Codebase',
                metadata: {
                    name: 'test-app-name',
                    namespace: 'test-namespace',
                },
                spec: {
                    defaultBranch: 'test-default-branch',
                    versioning: {
                        type: 'edp',
                        startFrom: '0.0.0-SNAPSHOT',
                    },
                },
            } as unknown as EDPCodebaseKubeObjectInterface,
            open: true,
            handleOpenDialog: () => {},
            handleCloseDialog: () => {},
        };
        const store = configureStore({
            reducer: () => ({}),
        });
        const queryClient = new QueryClient();

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <SnackbarProvider>
                        <CreateCodebaseBranch {...props} />
                    </SnackbarProvider>
                </QueryClientProvider>
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByTestId('create-codebase-branch')).toMatchSnapshot();
        });
    });
});
