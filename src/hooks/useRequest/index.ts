import { Notistack, React } from '../../plugin.globals';

const { useSnackbar } = Notistack;

interface UseRequestProps {
    requestFn: (...any) => Promise<any>;
    options: {
        mode: 'edit' | 'delete' | 'create';
    };
}

interface UseRequestReturn {
    state: {
        isLoading: boolean;
        error: Error;
        data: any;
    };
    fireRequest: ({ objectName, args }: { objectName: string; args?: any[] }) => Promise<void>;
}

export const useRequest = ({ requestFn, options: { mode } }: UseRequestProps): UseRequestReturn => {
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<Error>(null);
    const [data, setData] = React.useState<any>(null);

    const _requestFn = React.useCallback(
        async ({ objectName, args = [] }) => {
            const startMessage = (() => {
                switch (mode) {
                    case 'create':
                        return `Applying ${objectName}`;
                    case 'edit':
                        return `Updating ${objectName}`;
                    case 'delete':
                        return `Deleting ${objectName}`;
                }
            })();

            const successMessage = (() => {
                switch (mode) {
                    case 'create':
                        return `${objectName} has been successfully applied`;
                    case 'edit':
                        return `${objectName} has been successfully updated`;
                    case 'delete':
                        return `${objectName} has been successfully deleted`;
                }
            })();

            const errorMessage = (() => {
                switch (mode) {
                    case 'create':
                        return `Failed to apply ${objectName}`;
                    case 'edit':
                        return `Failed to update ${objectName}`;
                    case 'delete':
                        return `Failed to delete ${objectName}`;
                }
            })();

            try {
                enqueueSnackbar(startMessage, {
                    autoHideDuration: 2000,
                    variant: 'info',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                });

                setIsLoading(true);

                const data = await requestFn(...args);
                setData(data);

                enqueueSnackbar(successMessage, {
                    autoHideDuration: 5000,
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                });
                setIsLoading(false);
            } catch (error: any) {
                console.error(error);
                enqueueSnackbar(errorMessage, {
                    autoHideDuration: 5000,
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                });
                setIsLoading(false);
                setError(error);
            }
        },
        [enqueueSnackbar, mode, requestFn]
    );

    return { state: { isLoading, error, data }, fireRequest: _requestFn };
};
