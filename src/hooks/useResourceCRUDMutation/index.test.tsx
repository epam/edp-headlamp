/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CRUD_TYPES } from '../../constants/crudTypes';
import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
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
    jest.spyOn(QuickLinkKubeObject.apiEndpoint, 'post').mockResolvedValue(mutationDataMock);

    await act(async () => {
      const { result } = renderHook(
        () => useResourceCRUDMutation('test', QuickLinkKubeObject, CRUD_TYPES.CREATE),
        {
          wrapper: wrapper,
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
      result.current.mutate(mutationDataMock);
      await new Promise((resolve) => setTimeout(resolve, 0));

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
    jest.spyOn(QuickLinkKubeObject.apiEndpoint, 'put').mockRejectedValue({ error: 'error' });

    await act(async () => {
      const { result } = renderHook(
        () => useResourceCRUDMutation('test', QuickLinkKubeObject, CRUD_TYPES.EDIT),
        {
          wrapper: wrapper,
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
      result.current.mutate(mutationDataMock);
      await new Promise((resolve) => setTimeout(resolve, 0));

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
