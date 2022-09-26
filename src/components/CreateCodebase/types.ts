import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../types/global';

export interface CreateCodebaseProps {
    type: string;
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    handleApply(
        data: DeepPartial<EDPCodebaseKubeObjectInterface>,
        codebaseAuthData: CodebaseAuthData | null
    ): void;
    isApplying: boolean;
}

export interface CodebaseAuthData {
    repositoryLogin: string;
    repositoryPasswordOrApiToken: string;
}
