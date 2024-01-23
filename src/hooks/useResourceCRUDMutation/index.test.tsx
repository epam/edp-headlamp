/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CRUD_TYPES } from '../../constants/crudTypes';
import { EDPComponentKubeObject } from '../../k8s/EDPComponent';
import { mutationDataMock } from './data.mock';
import { useResourceCRUDMutation } from './index';

const mockShowBeforeRequestMessage = jest.fn();
const mockShowRequestSuccessMessage = jest.fn();
const mockShowRequestErrorMessage = jest.fn();
const mockShowRequestErrorDetailedMessage = jest.fn();

jest.mock('../useResourceRequestStatusMessages', () => ({
  useRequestStatusMessages: jest.fn(() => ({
    enqueueSnackbar: jest.fn(),
    showBeforeRequestMessage: mockShowBeforeRequestMessage,
    showRequestSuccessMessage: mockShowRequestSuccessMessage,
    showRequestErrorMessage: mockShowRequestErrorMessage,
    showRequestErrorDetailedMessage: mockShowRequestErrorDetailedMessage,
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('testing useResourceCRUDMutation hook', () => {
  it('Request resolve scenario: the hook renders successfully, useMutation.mutate fn works correctly, notification callbacks are firing', async () => {
    jest.spyOn(EDPComponentKubeObject.apiEndpoint, 'post').mockResolvedValue(mutationDataMock);

    await act(async () => {
      console.log('Before renderHook');
      const { result } = renderHook(
        () => useResourceCRUDMutation('test', EDPComponentKubeObject, CRUD_TYPES.CREATE),
        {
          wrapper: wrapper,
        }
      );
      console.log('After renderHook');

      console.log('Before mutate');
      await new Promise(resolve => setTimeout(resolve, 0));
      result.current.mutate(mutationDataMock);
      console.log('After mutate');
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(result.current.data).toEqual(mutationDataMock);
      expect(result.current.variables).toEqual(mutationDataMock);
      expect(mockShowBeforeRequestMessage).toHaveBeenCalledWith(CRUD_TYPES.CREATE, {
        customMessage: undefined,
        entityName: `${result.current.variables.kind} ${result.current.variables.metadata.name}`,
      });
      expect(mockShowRequestSuccessMessage).toHaveBeenCalledWith(CRUD_TYPES.CREATE, {
        customMessage: undefined,
        entityName: `${result.current.variables.kind} ${result.current.variables.metadata.name}`,
      });
      expect(mockShowRequestErrorMessage).not.toHaveBeenCalled();
      expect(mockShowRequestErrorDetailedMessage).not.toHaveBeenCalled();
    });
  });
  it('Request reject scenario: the hook renders successfully, useMutation.mutate fn works correctly, notification callbacks are firing', async () => {
    jest.spyOn(EDPComponentKubeObject.apiEndpoint, 'put').mockRejectedValue({ error: 'error' });

    await act(async () => {
      console.log('Before renderHook');
      const { result } = renderHook(
        () => useResourceCRUDMutation('test', EDPComponentKubeObject, CRUD_TYPES.EDIT),
        {
          wrapper: wrapper,
        }
      );
      console.log('After renderHook');

      console.log('Before mutate');
      await new Promise(resolve => setTimeout(resolve, 0));
      result.current.mutate(mutationDataMock);
      console.log('After mutate');
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual({ error: 'error' });
      expect(result.current.variables).toEqual(mutationDataMock);
      expect(mockShowBeforeRequestMessage).toHaveBeenCalledWith(CRUD_TYPES.EDIT, {
        customMessage: undefined,
        entityName: `${result.current.variables.kind} ${result.current.variables.metadata.name}`,
      });
      expect(mockShowRequestSuccessMessage).not.toHaveBeenCalled();
      expect(mockShowRequestErrorMessage).toHaveBeenCalledWith(CRUD_TYPES.EDIT, {
        customMessage: undefined,
        entityName: `${result.current.variables.kind} ${result.current.variables.metadata.name}`,
      });
      expect(mockShowRequestErrorDetailedMessage).toHaveBeenCalledWith(result.current.error);
    });
  });
});
