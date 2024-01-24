import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { CRUD_TYPES } from '../../constants/crudTypes';
import { ICONS } from '../../icons/iconify-icons-mapping';

interface Options {
  entityName: string;
  customMessage?: string;
}

export const useRequestStatusMessages = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showBeforeRequestMessage = (mode: CRUD_TYPES, { entityName, customMessage }: Options) => {
    const beforeRequestMessage = (() => {
      switch (mode) {
        case CRUD_TYPES.CREATE:
          return customMessage || `Applying ${entityName}`;
        case CRUD_TYPES.EDIT:
          return customMessage || `Updating ${entityName}`;
        case CRUD_TYPES.DELETE:
          return customMessage || `Deleting ${entityName}`;
      }
    })();

    enqueueSnackbar(beforeRequestMessage, {
      autoHideDuration: 2000,
      variant: 'info',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      action: (key) => (
        <IconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={ICONS.CROSS} />
        </IconButton>
      ),
    });
  };

  const showRequestSuccessMessage = (mode: CRUD_TYPES, { entityName, customMessage }: Options) => {
    const requestSuccessMessage = (() => {
      switch (mode) {
        case CRUD_TYPES.CREATE:
          return customMessage || `${entityName} has been successfully applied`;
        case CRUD_TYPES.EDIT:
          return customMessage || `${entityName} has been successfully updated`;
        case CRUD_TYPES.DELETE:
          return customMessage || `${entityName} has been successfully deleted`;
      }
    })();
    enqueueSnackbar(requestSuccessMessage, {
      autoHideDuration: 5000,
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      action: (key) => (
        <IconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={ICONS.CROSS} />
        </IconButton>
      ),
    });
  };

  const showRequestErrorMessage = (mode: CRUD_TYPES, { entityName, customMessage }: Options) => {
    const requestErrorMessage = (() => {
      switch (mode) {
        case CRUD_TYPES.CREATE:
          return customMessage || `Failed to apply ${entityName}`;
        case CRUD_TYPES.EDIT:
          return customMessage || `Failed to update ${entityName}`;
        case CRUD_TYPES.DELETE:
          return customMessage || `Failed to delete ${entityName}`;
      }
    })();

    enqueueSnackbar(requestErrorMessage, {
      autoHideDuration: 5000,
      variant: 'error',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      action: (key) => (
        <IconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={ICONS.CROSS} />
        </IconButton>
      ),
    });
  };

  const showRequestErrorDetailedMessage = (error: unknown) => {
    enqueueSnackbar(error.toString(), {
      autoHideDuration: 5000,
      variant: 'error',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      action: (key) => (
        <IconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={ICONS.CROSS} />
        </IconButton>
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
