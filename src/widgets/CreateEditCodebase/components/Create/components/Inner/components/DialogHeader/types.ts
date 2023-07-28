import React from 'react';
import { EDPCodebaseKubeObjectInterface } from '../../../../../../../../k8s/EDPCodebase/types';

export interface DialogHeaderProps {
    setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditorData: React.Dispatch<React.SetStateAction<EDPCodebaseKubeObjectInterface>>;
}
