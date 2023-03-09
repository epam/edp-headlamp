/**
 * @jest-environment jsdom
 */

import { describe, jest } from '@jest/globals';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { namespacesMock } from '../../hooks/useNamespaces/mocks/namespaces.mock';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { pluginLib } from '../../plugin.globals';
import { CreateCDPipelineStage } from './index';
import { CreateCDPipelineStageProps } from './types';

const { ApiProxy } = pluginLib;

describe('CreateCDPipelineStage', () => {
    it('should render correctly', async () => {
        const props: CreateCDPipelineStageProps = {
            availableCITools: ['jenkins', 'tekton'],
            CDPipelineData: {
                apiVersion: 'apiVersion',
                kind: 'CDPipeline',
                metadata: {
                    name: 'test-app-name',
                    namespace: 'test-namespace',
                },
            } as unknown as EDPCDPipelineKubeObjectInterface,
            otherStages: [
                {
                    apiVersion: 'apiVersion',
                    kind: 'Stage',
                    spec: {
                        name: 'sit',
                    },
                    metadata: {
                        name: 'test-pipe-sit',
                        namespace: 'test-namespace',
                    },
                } as unknown as EDPCDPipelineStageKubeObjectInterface,
            ],
            open: true,
            setOpen: () => {},
            onClose: () => {},
            handleApply: () => {},
            isApplying: false,
        };
        const store = configureStore({
            reducer: () => ({}),
        });
        const queryClient = new QueryClient();

        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('/api/v1/namespaces')) {
                return Promise.resolve({
                    items: [
                        { kind: 'Namespace', metadata: { name: 'namespace-1' } },
                        { kind: 'Namespace', metadata: { name: 'namespace-2' } },
                    ],
                });
            }
        });

        const theme: DefaultTheme = createTheme();

        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('/api/v1/namespaces')) {
                return Promise.resolve(namespacesMock);
            }
        });

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <SnackbarProvider>
                        <ThemeProvider theme={theme}>
                            <CreateCDPipelineStage {...props} />
                        </ThemeProvider>
                    </SnackbarProvider>
                </QueryClientProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('create-cdpipeline-stage')).toMatchSnapshot();
        });
    });
});
