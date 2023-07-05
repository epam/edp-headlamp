import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface DeleteKubeObjectProps {
    popupOpen: boolean;
    setPopupOpen(boolean): void;
    kubeObject: KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
    objectName: string;
    description: string;
    onBeforeSubmit?(
        setErrorTemplate: React.Dispatch<React.SetStateAction<React.ReactNode>>,
        setLoadingActive: React.Dispatch<React.SetStateAction<boolean>>
    ): Promise<void>;
    onSuccess?: () => void;
}
