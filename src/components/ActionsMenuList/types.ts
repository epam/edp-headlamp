import { KubeObjectAction } from '../../types/actions';

export interface ActionsMenuListProps {
  actions: KubeObjectAction[];
  handleCloseActionsMenu: (event: MouseEvent | TouchEvent) => void;
  anchorEl: HTMLElement | null;
}
