/**
 * @jest-environment jsdom
 */

import { describe } from '@jest/globals';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { CreateCDPipelineStageProps } from './types';
import { CreateCDPipelineStage } from './view';

describe('CreateCDPipelineStage', () => {
    it('should render correctly', () => {
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

        const theme = createTheme();

        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <ThemeProvider theme={theme}>
                        <CreateCDPipelineStage {...props} />
                    </ThemeProvider>
                </SnackbarProvider>
            </Provider>
        );

        expect(screen.getByTestId('create-cdpipeline-stage')).toMatchSnapshot();
    });
});
