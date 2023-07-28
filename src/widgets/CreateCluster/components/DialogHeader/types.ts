import React from 'react';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';

export interface DialogHeaderProps {
    setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditorData: React.Dispatch<React.SetStateAction<SecretKubeObjectInterface>>;
}
