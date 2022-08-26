export const throwErrorNoty = (
    enqueueSnackbar: (errorMessage: string, options: Object) => void,
    errorMessage: string
): void => {
    enqueueSnackbar(errorMessage, {
        autoHideDuration: 10000,
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
    });
};
