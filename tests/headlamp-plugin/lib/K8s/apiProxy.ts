export const apiFactoryWithNamespace = () => ({
    post: () => Promise.resolve(),
    delete: () => Promise.resolve(),
    put: () => Promise.resolve(),
});
export const request = () => Promise.resolve();
export const stream = () => Promise.resolve();

export default {
    apiFactoryWithNamespace,
    request,
    stream,
};
