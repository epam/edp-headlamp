import { KubeObjectAction } from '../../types/actions';

export interface ActionsMenuListProps {
  actions: KubeObjectAction[];
  handleCloseActionsMenu?(): void;
  anchorEl: HTMLElement | null;
}
