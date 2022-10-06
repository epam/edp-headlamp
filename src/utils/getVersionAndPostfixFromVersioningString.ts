export const getVersionAndPostfixFromVersioningString = (
    versioning: string
): {
    version: string;
    postfix: string;
} => {
    const [version, postfix] = versioning.split('-');

    return { version, postfix };
};
