import React from 'react';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';

export interface FormProps {
    editorOpen: boolean;
    editorData: EDPGitServerKubeObjectInterface;
    setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
