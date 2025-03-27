import { KubeObjectAction } from '../../types/actions';

export interface ActionsMenuListProps {
  actions: KubeObjectAction[];
  handleCloseActionsMenu: ((event: MouseEvent | TouchEvent) => void) | undefined;
  anchorEl?: HTMLElement | null;
}
