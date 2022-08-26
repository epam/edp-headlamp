export const createErrorMessage = (err: Error | unknown, objectName: string): string => {
    let errorMessage = `Oops! Something went wrong! Couldn't apply ${objectName}`;
    if (err instanceof Error) {
        errorMessage = err.message;
    }

    return errorMessage;
};
