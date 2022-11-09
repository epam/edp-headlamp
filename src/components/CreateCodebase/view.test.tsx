/**
 * @jest-environment jsdom
 */

import { describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { namespacesMock } from '../../hooks/useNamespaces/mocks/namespaces.mock';
import { pluginLib } from '../../plugin.globals';
import { CreateCodebaseProps } from './types';
import { CreateCodebase } from './view';

const { ApiProxy } = pluginLib;

describe('CreateCodebase', () => {
    describe('codebase type - application', () => {
        it('should render correctly', async () => {
            const props: CreateCodebaseProps = {
                type: 'application',
                createDialogOpen: true,
                setCreateDialogOpen: () => {},
                onClose: () => {},
            };
            const store = configureStore({
                reducer: () => ({}),
            });

            jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
                if (url.includes('/api/v1/namespaces')) {
                    return Promise.resolve(namespacesMock);
                }
            });

            render(
                <Provider store={store}>
                    <SnackbarProvider>
                        <CreateCodebase {...props} />
                    </SnackbarProvider>
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
                type: 'library',
                createDialogOpen: true,
                setCreateDialogOpen: () => {},
                onClose: () => {},
            };
            const store = configureStore({
                reducer: () => ({}),
            });

            jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
                if (url.includes('/api/v1/namespaces')) {
                    return Promise.resolve(namespacesMock);
                }
            });

            render(
                <Provider store={store}>
                    <SnackbarProvider>
                        <CreateCodebase {...props} />
                    </SnackbarProvider>
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
                type: 'autotest',
                createDialogOpen: true,
                setCreateDialogOpen: () => {},
                onClose: () => {},
            };
            const store = configureStore({
                reducer: () => ({}),
            });

            jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
                if (url.includes('/api/v1/namespaces')) {
                    return Promise.resolve(namespacesMock);
                }
            });

            render(
                <Provider store={store}>
                    <SnackbarProvider>
                        <CreateCodebase {...props} />
                    </SnackbarProvider>
                </Provider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('create-codebase')).toMatchSnapshot();
            });
        });
    });
});
