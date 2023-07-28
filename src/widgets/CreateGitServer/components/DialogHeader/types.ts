import React from 'react';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';

export interface DialogHeaderProps {
    setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditorData: React.Dispatch<React.SetStateAction<EDPGitServerKubeObjectInterface>>;
}
