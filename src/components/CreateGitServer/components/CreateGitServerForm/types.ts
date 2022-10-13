import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export interface CreateGitServerFormProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(
        gitServerData: DeepPartial<EDPGitServerKubeObjectInterface>,
        gitServerSecretData: DeepPartial<EDPKubeObjectInterface>
    ): void;
    isApplying: boolean;
}
