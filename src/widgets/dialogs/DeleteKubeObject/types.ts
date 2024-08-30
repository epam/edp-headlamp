import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { DialogProps } from '../../../providers/Dialog/types';
import { EDPKubeObjectInterface } from '../../../types/k8s';

export interface DeleteKubeObjectDialogProps
  extends DialogProps<{
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
  }> {}
