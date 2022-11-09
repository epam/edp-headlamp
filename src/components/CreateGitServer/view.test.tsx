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
import { Provider } from 'react-redux';
import { namespacesMock } from '../../hooks/useNamespaces/mocks/namespaces.mock';
import { pluginLib } from '../../plugin.globals';
import { CreateGitServerProps } from './types';
import { CreateGitServer } from './view';

const { ApiProxy } = pluginLib;

describe('CreateGitServer', () => {
    it('should render correctly', async () => {
        const props: CreateGitServerProps = {
            createDialogOpen: true,
            setCreateDialogOpen: () => {},
            onClose: () => {},
        };
        const store = configureStore({
            reducer: () => ({}),
        });

        const theme: DefaultTheme = createTheme();

        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('/api/v1/namespaces')) {
                return Promise.resolve(namespacesMock);
            }
        });

        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <ThemeProvider theme={theme}>
                        <CreateGitServer {...props} />
                    </ThemeProvider>
                </SnackbarProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('create-git-server')).toMatchSnapshot();
        });
    });
});
