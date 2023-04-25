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
import { namespacesMock } from '../../hooks/useNamespaces/mocks/namespaces.mock';
import { pluginLib } from '../../plugin.globals';
import { CreateCodebase } from './index';
import { CreateCodebaseProps } from './types';

const { ApiProxy } = pluginLib;

describe('CreateCodebase', () => {
    describe('codebase type - application', () => {
        it('should render correctly', async () => {
            const props: CreateCodebaseProps = {
                createDialogOpen: true,
                setCreateDialogOpen: () => {},
            };
            const store = configureStore({
                reducer: () => ({}),
            });
            const queryClient = new QueryClient();

            jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
                if (url.includes('/api/v1/namespaces')) {
                    return Promise.resolve(namespacesMock);
                }
            });

            render(
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <SnackbarProvider>
                            <CreateCodebase {...props} />
                        </SnackbarProvider>
                    </QueryClientProvider>
                </Provider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('create-codebase')).toMatchSnapshot();
            });
        });
    });

    describe('codebase type - library', () => {
        it('should render correctly', async () => {
            const props: CreateCodebaseProps = {
                createDialogOpen: true,
                setCreateDialogOpen: () => {},
            };
            const store = configureStore({
                reducer: () => ({}),
            });
            const queryClient = new QueryClient();

            jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
                if (url.includes('/api/v1/namespaces')) {
                    return Promise.resolve(namespacesMock);
                }
            });

            render(
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <SnackbarProvider>
                            <CreateCodebase {...props} />
                        </SnackbarProvider>
                    </QueryClientProvider>
                </Provider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('create-codebase')).toMatchSnapshot();
            });
        });
    });

    describe('codebase type - autotest', () => {
        it('should render correctly', async () => {
            const props: CreateCodebaseProps = {
                createDialogOpen: true,
                setCreateDialogOpen: () => {},
            };
            const store = configureStore({
                reducer: () => ({}),
            });
            const queryClient = new QueryClient();

            jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
                if (url.includes('/api/v1/namespaces')) {
                    return Promise.resolve(namespacesMock);
                }
            });

            render(
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <SnackbarProvider>
                            <CreateCodebase {...props} />
                        </SnackbarProvider>
                    </QueryClientProvider>
                </Provider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('create-codebase')).toMatchSnapshot();
            });
        });
    });
});
