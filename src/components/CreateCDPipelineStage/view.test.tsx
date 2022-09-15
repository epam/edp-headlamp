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
import { CreateCDPipelineStageProps } from './types';
import { CreateCDPipelineStage } from './view';

const { ApiProxy } = pluginLib;

describe('CreateCDPipelineStage', () => {
    it('should render correctly', async () => {
        const props: CreateCDPipelineStageProps = {
            CDPipelineData: {
                apiVersion: 'apiVersion',
                kind: 'Stage',
                metadata: {
                    name: 'test-app-name',
                    namespace: 'test-namespace',
                },
            },
            stagesQuantity: 2,
            open: true,
            setOpen: () => {},
            onClose: () => {},
            handleApply: () => {},
        };
        const store = configureStore({
            reducer: () => ({}),
        });

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
                <SnackbarProvider>
                    <ThemeProvider theme={theme}>
                        <CreateCDPipelineStage {...props} />
                    </ThemeProvider>
                </SnackbarProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('create-cdpipeline-stage')).toMatchSnapshot();
        });
    });
});
