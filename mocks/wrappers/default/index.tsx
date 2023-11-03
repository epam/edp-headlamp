/**
 * @jest-environment jsdom
 */

import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const TestWrapper: React.FC = ({ children }) => {
    const queryClient = new QueryClient();
    const theme = createTheme({
        // @ts-ignore
        palette: {
            primaryColor: '#000',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider>{children}</SnackbarProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};
