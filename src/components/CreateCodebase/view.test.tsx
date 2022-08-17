/**
 * @jest-environment jsdom
 */

import { describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { CreateCodebaseProps } from './types';
import { CreateCodebase } from './view';

describe('CreateCodebase', () => {
    describe('codebase type - application', () => {
        it('should render correctly', () => {
            const props: CreateCodebaseProps = {
                type: 'application',
                open: true,
                setOpen: () => {},
                onClose: () => {},
            };
            const store = configureStore({
                reducer: () => ({}),
            });

            render(
                <Provider store={store}>
                    <SnackbarProvider>
                        <CreateCodebase {...props} />
                    </SnackbarProvider>
                </Provider>
            );

            expect(screen.getByTestId('create-codebase')).toMatchSnapshot();
        });
    });

    describe('codebase type - library', () => {
        it('should render correctly', () => {
            const props: CreateCodebaseProps = {
                type: 'library',
                open: true,
                setOpen: () => {},
                onClose: () => {},
            };
            const store = configureStore({
                reducer: () => ({}),
            });

            render(
                <Provider store={store}>
                    <SnackbarProvider>
                        <CreateCodebase {...props} />
                    </SnackbarProvider>
                </Provider>
            );

            expect(screen.getByTestId('create-codebase')).toMatchSnapshot();
        });
    });

    describe('codebase type - autotest', () => {
        it('should render correctly', () => {
            const props: CreateCodebaseProps = {
                type: 'autotest',
                open: true,
                setOpen: () => {},
                onClose: () => {},
            };
            const store = configureStore({
                reducer: () => ({}),
            });

            render(
                <Provider store={store}>
                    <SnackbarProvider>
                        <CreateCodebase {...props} />
                    </SnackbarProvider>
                </Provider>
            );

            expect(screen.getByTestId('create-codebase')).toMatchSnapshot();
        });
    });
});
