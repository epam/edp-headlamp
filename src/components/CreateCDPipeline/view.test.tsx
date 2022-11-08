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
import { CreateCDPipelineProps } from './types';
import { CreateCDPipeline } from './view';

const { ApiProxy } = pluginLib;

describe('CreateCDPipeline', () => {
    it('should render correctly', async () => {
        const props: CreateCDPipelineProps = {
            createDialogOpen: true,
            setCreateDialogOpen: () => {},
            onClose: () => {},
            isApplying: false,
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
                        <CreateCDPipeline {...props} />
                    </ThemeProvider>
                </SnackbarProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('create-cdpipeline')).toMatchSnapshot();
        });
    });
});
