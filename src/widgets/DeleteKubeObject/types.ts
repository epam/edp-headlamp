import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface DeleteKubeObjectDialogForwardedProps {
    onSuccess?: () => void;
    description: string;
    objectName: string;
    kubeObject: KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
    onBeforeSubmit?(
        setErrorTemplate: React.Dispatch<React.SetStateAction<React.ReactNode>>,
        setLoadingActive: React.Dispatch<React.SetStateAction<boolean>>
    ): Promise<void>;
}
