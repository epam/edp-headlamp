export type Action = 'create' | 'delete' | 'update' | 'list';

export type PermissionSet = {
  [key in Action]?: boolean;
};
export type PermissionList<T extends string> = {
  [key in T]: PermissionSet;
};
