export interface QuickLinkActionsMenuProps {
  data: any;
  backRoute?: string;
  variant?: 'menu' | 'inline';
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
}
