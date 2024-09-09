import { usePermissions } from '../../../../../providers/Permissions/hooks';
import { permissionsToCheckConfig } from '../constants';

export const useTypedPermissions = () => usePermissions<typeof permissionsToCheckConfig>();
