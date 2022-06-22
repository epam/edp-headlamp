export const createSidebarRouteURLBasedOnName = (name: string): string => `/edp/${name}`;
export const createSidebarRouteURLBasedOnNameAndNamespace = (name: string): string =>
    `/edp/${name}/:namespace/:name`;
