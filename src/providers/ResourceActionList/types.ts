import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

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
