import { React } from '../../plugin.globals';
import type { k8s } from '../../plugin.types';
import { DeepPartial } from '../../types/global';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface DeleteKubeObjectProps {
    popupOpen: boolean;
    setPopupOpen(boolean): void;
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: DeepPartial<EDPKubeObjectInterface>;
    objectName: string;
    description: string;
    onBeforeSubmit?(
        setErrorTemplate: React.Dispatch<React.SetStateAction<React.ReactNode>>,
        setLoadingActive: React.Dispatch<React.SetStateAction<boolean>>
    ): Promise<void>;
    onSuccess?: () => void;
}
