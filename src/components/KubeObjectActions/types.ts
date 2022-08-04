import { KubeObjectAction } from '../../types/actions';

export interface KubeObjectActionsProps {
    actions: KubeObjectAction[];
    anchorEl: HTMLElement | null;
    handleCloseActionsMenu(): void;
}
