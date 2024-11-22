import { OptionsObject, useSnackbar } from 'notistack';
import React from 'react';
import { Snackbar } from '../../components/Snackbar';
import { CRUD_TYPES } from '../../constants/crudTypes';

interface Options {
  entityName?: string;
  customMessage?: {
    message: string;
    options?: OptionsObject;
  };
}

export const useRequestStatusMessages = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showBeforeRequestMessage = (mode: CRUD_TYPES, { entityName, customMessage }: Options) => {
    const beforeRequestMessage = (() => {
      switch (mode) {
        case CRUD_TYPES.CREATE:
          return `Applying ${entityName}`;
        case CRUD_TYPES.EDIT:
          return `Updating ${entityName}`;
        case CRUD_TYPES.DELETE:
          return `Deleting ${entityName}`;
      }
    })();

    const defaultOptions = {
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      variant: 'info',
      content: (key, message) => (
        <Snackbar snackbarKey={key} text={String(message)} variant="info" />
      ),
    } as const;

    if (customMessage) {
      const { message, options = {} } = customMessage;
      const mergedOptions = {
        ...defaultOptions,
        ...options,
      };
      enqueueSnackbar(message, mergedOptions);
    } else {
      enqueueSnackbar(beforeRequestMessage, defaultOptions);
    }
  };

  const showRequestSuccessMessage = (mode: CRUD_TYPES, { entityName, customMessage }: Options) => {
    const requestSuccessMessage = (() => {
      switch (mode) {
        case CRUD_TYPES.CREATE:
          return `${entityName} has been successfully applied`;
        case CRUD_TYPES.EDIT:
          return `${entityName} has been successfully updated`;
        case CRUD_TYPES.DELETE:
          return `${entityName} has been successfully deleted`;
      }
    })();

    const defaultOptions = {
      autoHideDuration: 5000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      variant: 'success',
      content: (key, message) => (
        <Snackbar snackbarKey={key} text={String(message)} variant="success" />
      ),
    } as const;

    if (customMessage) {
      const { message, options = {} } = customMessage;
      const mergedOptions = {
        ...defaultOptions,
        ...options,
      };
      enqueueSnackbar(message, mergedOptions);
    } else {
      enqueueSnackbar(requestSuccessMessage, defaultOptions);
    }
  };

  const showRequestErrorMessage = (mode: CRUD_TYPES, { entityName, customMessage }: Options) => {
    const requestErrorMessage = (() => {
      switch (mode) {
        case CRUD_TYPES.CREATE:
          return `Failed to apply ${entityName}`;
        case CRUD_TYPES.EDIT:
          return `Failed to update ${entityName}`;
        case CRUD_TYPES.DELETE:
          return `Failed to delete ${entityName}`;
      }
    })();

    const defaultOptions = {
      autoHideDuration: 5000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      variant: 'error',
      content: (key, message) => (
        <Snackbar snackbarKey={key} text={String(message)} variant="error" />
      ),
    } as const;

    if (customMessage) {
      const { message, options = {} } = customMessage;
      const mergedOptions = {
        ...defaultOptions,
        ...options,
      };
      enqueueSnackbar(message, mergedOptions);
    } else {
      enqueueSnackbar(requestErrorMessage, defaultOptions);
    }
  };

  const showRequestErrorDetailedMessage = (error: unknown) => {
    enqueueSnackbar(error.toString(), {
      autoHideDuration: 5000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      content: (key, message) => (
        <Snackbar snackbarKey={key} text={String(message)} variant="error" />
      ),
    });
  };

  return {
    showBeforeRequestMessage,
    showRequestSuccessMessage,
    showRequestErrorMessage,
    showRequestErrorDetailedMessage,
  };
};
