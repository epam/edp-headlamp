import { usePermissions } from '../../../../../providers/Permissions/hooks';
import { pagePermissionsToCheck } from '../constants';

export const useTypedPermissions = () => usePermissions<typeof pagePermissionsToCheck>();
