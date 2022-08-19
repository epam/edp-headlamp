export const makeKubeObject = () => {
    return class {
        static useList() {
            throw new Error('Use mock instead!');
        }

        static apiEndpoint = {
            post: () => {},
        };
    };
};

export class SecretKubeObject extends makeKubeObject() {}
