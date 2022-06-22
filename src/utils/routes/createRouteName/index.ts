export const createRouteName = (name: string): string => `/edp/${name}`;
export const createRouteNameBasedOnNameAndNamespace = (name: string): string =>
    `/edp/${name}/:namespace/:name`;
