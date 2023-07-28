import React from 'react';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';

export interface FormProps {
    editorOpen: boolean;
    editorData: SecretKubeObjectInterface;
    setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
