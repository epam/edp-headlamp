import { PermissionSet } from '../../types/permissions';

export interface QuickLinkActionsMenuProps {
  data: any;
  backRoute?: string;
  variant?: 'menu' | 'inline';
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
  permissions: PermissionSet;
}
