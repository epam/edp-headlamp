import { KubeObjectInterface } from '../../plugin.types';

export interface ResourceActionListContextProviderValue {
    anchorEl: HTMLElement | null;
    kubeObject: KubeObjectInterface;
    isDetailsPage?: boolean;
    handleOpenResourceActionListMenu: (
        anchorEl: HTMLElement | null,
        kubeObject: KubeObjectInterface,
        isDetailsPage?: boolean
    ) => void;
    handleCloseResourceActionListMenu: () => void;
}
