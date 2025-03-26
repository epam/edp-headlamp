import { PermissionsConfig } from '../../providers/Permissions/types';
import { widgetPermissionsToCheck } from './constants';

export interface QuickLinkActionsMenuProps {
  data: any;
  backRoute?: string;
  variant?: 'menu' | 'inline';
  anchorEl?: HTMLElement | null;
  handleCloseResourceActionListMenu?: () => void;
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
}
