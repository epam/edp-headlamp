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
import { pluginLib } from '../../plugin.globals';
import { CreateCDPipeline } from './index';
import { CreateCDPipelineProps } from './types';

const { ApiProxy } = pluginLib;

describe('CreateCDPipeline', () => {
    it('should render correctly', async () => {
        const props: CreateCDPipelineProps = {
            createDialogOpen: true,
            setCreateDialogOpen: () => {},
            onClose: () => {},
        };

        const store = configureStore({
            reducer: () => ({}),
        });
        const queryClient = new QueryClient();

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
                            <CreateCDPipeline {...props} />
                        </ThemeProvider>
                    </SnackbarProvider>
                </QueryClientProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('create-cdpipeline')).toMatchSnapshot();
        });
    });
});
