import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { OptionsObject } from 'notistack';
import React from 'react';
import { DialogProps } from '../../../providers/Dialog/types';
import { EDPKubeObjectInterface } from '../../../types/k8s';

interface Message {
  message: string;
  options?: OptionsObject;
}

type CustomMessages = {
  onMutate?: Message;
  onError?: Message;
  onSuccess?: Message;
};

export interface DeleteKubeObjectDialogProps
  extends DialogProps<{
    description: string;
    objectName: string | undefined;
    kubeObject: KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
    onBeforeSubmit?(
      setErrorTemplate: React.Dispatch<React.SetStateAction<React.ReactNode>>,
      setLoadingActive: React.Dispatch<React.SetStateAction<boolean>>
    ): Promise<void>;
    backRoute?: string;
    onSuccess?: () => void;
    createCustomMessages?: (item: EDPKubeObjectInterface) => CustomMessages;
  }> {}
