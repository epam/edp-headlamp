/**
 * @jest-environment jsdom
 */

import { describe, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { DeleteKubeObject } from './index';
import { DeleteKubeObjectProps } from './types';

describe('DeleteKubeObject', () => {
    test('renders correctly', () => {
        const props: DeleteKubeObjectProps = {
            popupOpen: true,
            setPopupOpen: () => {},
            kubeObject: null,
            kubeObjectData: {
                apiVersion: 'apiextensions.k8s.io/v1',
                kind: 'CustomResourceDefinition',
                metadata: {
                    name: 'TestCustomResourceDefinition',
                    namespace: 'best-namespace-ever',
                    finalizers: [],
                    generation: 1,
                    uid: '',
                    creationTimestamp: new Date().toISOString(),
                    resourceVersion: 'unknown',
                    selfLink: '',
                },
            },
            objectName: 'super-cool-object-name',
            description: 'Confirmation message for test action',
            onBeforeSubmit: () => Promise.resolve(),
        };
        const store = configureStore({
            reducer: () => ({}),
        });
        const queryClient = new QueryClient();

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <SnackbarProvider>
                        <DeleteKubeObject {...props} />
                    </SnackbarProvider>
                </QueryClientProvider>
            </Provider>
        );

        expect(screen.getByRole('dialog')).toMatchSnapshot();
    });
});
