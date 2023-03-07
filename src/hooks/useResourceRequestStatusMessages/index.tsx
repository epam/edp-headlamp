import { CRUD_TYPES } from '../../constants/crudTypes';
import { Notistack } from '../../plugin.globals';

const { useSnackbar } = Notistack;
export const useRequestStatusMessages = (): {
    showBeforeRequestMessage: (resourceName: string, mode: CRUD_TYPES) => void;
    showRequestSuccessMessage: (resourceName: string, mode: CRUD_TYPES) => void;
    showRequestErrorMessage: (resourceName: string, mode: CRUD_TYPES) => void;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const showBeforeRequestMessage = (resourceName: string, mode: CRUD_TYPES) => {
        const beforeRequestMessage = (() => {
            switch (mode) {
                case 'create':
                    return `Applying ${resourceName}`;
                case 'edit':
                    return `Updating ${resourceName}`;
                case 'delete':
                    return `Deleting ${resourceName}`;
            }
        })();

        enqueueSnackbar(beforeRequestMessage, {
            autoHideDuration: 2000,
            variant: 'info',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        });
    };

    const showRequestSuccessMessage = (resourceName: string, mode: CRUD_TYPES) => {
        const requestSuccessMessage = (() => {
            switch (mode) {
                case 'create':
                    return `${resourceName} has been successfully applied`;
                case 'edit':
                    return `${resourceName} has been successfully updated`;
                case 'delete':
                    return `${resourceName} has been successfully deleted`;
            }
        })();
        enqueueSnackbar(requestSuccessMessage, {
            autoHideDuration: 5000,
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        });
    };

    const showRequestErrorMessage = (resourceName: string, mode: CRUD_TYPES) => {
        const requestErrorMessage = (() => {
            switch (mode) {
                case 'create':
                    return `Failed to apply ${resourceName}`;
                case 'edit':
                    return `Failed to update ${resourceName}`;
                case 'delete':
                    return `Failed to delete ${resourceName}`;
            }
        })();

        enqueueSnackbar(requestErrorMessage, {
            autoHideDuration: 5000,
            variant: 'error',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        });
    };

    return { showBeforeRequestMessage, showRequestSuccessMessage, showRequestErrorMessage };
};
