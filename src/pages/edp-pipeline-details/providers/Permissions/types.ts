import { ValueOf } from '../../../../types/global';
import { PermissionList } from '../../../../types/permissions';
import { permissionChecks } from '../../constants';

export type PermissionsContextProviderValue = PermissionList<ValueOf<typeof permissionChecks>>;
