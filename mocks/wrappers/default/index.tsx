/**
 * @jest-environment jsdom
 */

import { SnackbarProvider } from 'notistack';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const TestWrapper: React.FC = ({ children }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider>{children}</SnackbarProvider>
        </QueryClientProvider>
    );
};
