/**
 * @jest-environment jsdom
 */

import { describe } from '@jest/globals';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { CreateGitServer } from './index';
import { CreateGitServerProps } from './types';

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
        const queryClient = new QueryClient();

        const theme: DefaultTheme = createTheme();

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <SnackbarProvider>
                        <ThemeProvider theme={theme}>
                            <CreateGitServer {...props} />
                        </ThemeProvider>
                    </SnackbarProvider>
                </QueryClientProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('create-git-server')).toMatchSnapshot();
        });
    });
});
