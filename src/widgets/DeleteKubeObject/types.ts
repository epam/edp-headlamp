import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface DeleteKubeObjectDialogForwardedProps {
    description: string;
    objectName: string;
    kubeObject: KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
    onBeforeSubmit?(
        setErrorTemplate: React.Dispatch<React.SetStateAction<React.ReactNode>>,
        setLoadingActive: React.Dispatch<React.SetStateAction<boolean>>
    ): Promise<void>;
    backRoute?: string;
    onSuccess?: () => void;
}
