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
import { CreateCDPipelineProps } from './types';
import { CreateCDPipeline } from './view';

describe('CreateCDPipeline', () => {
    it('should render correctly', () => {
        const props: CreateCDPipelineProps = {
            open: true,
            setOpen: () => {},
            onClose: () => {},
            handleApply: () => {},
        };
        const store = configureStore({
            reducer: () => ({}),
        });

        const theme: DefaultTheme = createTheme();

        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <ThemeProvider theme={theme}>
                        <CreateCDPipeline {...props} />
                    </ThemeProvider>
                </SnackbarProvider>
            </Provider>
        );

        expect(screen.getByTestId('create-cdpipeline')).toMatchSnapshot();
    });
});
