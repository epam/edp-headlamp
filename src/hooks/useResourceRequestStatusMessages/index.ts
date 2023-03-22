import { CRUD_TYPES } from '../../constants/crudTypes';
import { Notistack } from '../../plugin.globals';

const { useSnackbar } = Notistack;
export const useRequestStatusMessages = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showBeforeRequestMessage = (kindName: string, resourceName: string, mode: CRUD_TYPES) => {
        const beforeRequestMessage = (() => {
            switch (mode) {
                case CRUD_TYPES.CREATE:
                    return `Applying ${kindName} ${resourceName}`;
                case CRUD_TYPES.EDIT:
                    return `Updating ${kindName} ${resourceName}`;
                case CRUD_TYPES.DELETE:
                    return `Deleting ${kindName} ${resourceName}`;
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

    const showRequestSuccessMessage = (
        kindName: string,
        resourceName: string,
        mode: CRUD_TYPES
    ) => {
        const requestSuccessMessage = (() => {
            switch (mode) {
                case CRUD_TYPES.CREATE:
                    return `${kindName} ${resourceName} has been successfully applied`;
                case CRUD_TYPES.EDIT:
                    return `${kindName} ${resourceName} has been successfully updated`;
                case CRUD_TYPES.DELETE:
                    return `${kindName} ${resourceName} has been successfully deleted`;
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

    const showRequestErrorMessage = (kindName: string, resourceName: string, mode: CRUD_TYPES) => {
        const requestErrorMessage = (() => {
            switch (mode) {
                case CRUD_TYPES.CREATE:
                    return `Failed to apply ${kindName} ${resourceName}`;
                case CRUD_TYPES.EDIT:
                    return `Failed to update ${kindName} ${resourceName}`;
                case CRUD_TYPES.DELETE:
                    return `Failed to delete ${kindName} ${resourceName}`;
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

    const showRequestErrorDetailedMessage = (error: unknown) => {
        enqueueSnackbar(error.toString(), {
            autoHideDuration: 5000,
            variant: 'error',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        });
    };

    return {
        showBeforeRequestMessage,
        showRequestSuccessMessage,
        showRequestErrorMessage,
        showRequestErrorDetailedMessage,
    };
};
