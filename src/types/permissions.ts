export interface PermissionSet {
  create?: boolean;
  delete?: boolean;
  update?: boolean;
  list?: boolean;
}

export type PermissionList<T extends string> = {
  [key in T]: PermissionSet;
};
