import React from 'react';
import { EDPCodebaseKubeObjectInterface } from '../../../../../../../../k8s/EDPCodebase/types';

export interface FormProps {
    editorOpen: boolean;
    editorData: EDPCodebaseKubeObjectInterface;
    setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formActiveTabIdx: number;
}
