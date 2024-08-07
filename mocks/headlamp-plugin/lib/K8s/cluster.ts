export const makeKubeObject = () => {
  return class {
    static useList() {
      return [undefined, undefined];
    }

    static useGet() {
      return [undefined, undefined];
    }

    static apiEndpoint = {
      post: () => {},
    };
  };
};

export class SecretKubeObject extends makeKubeObject() {}
export class ServiceAccountKubeObject extends makeKubeObject() {}
export class CodemieKubeObject extends makeKubeObject() {}
export class CodemieProjectKubeObject extends makeKubeObject() {}
