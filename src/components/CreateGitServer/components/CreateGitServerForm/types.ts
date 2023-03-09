import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export interface CreateGitServerFormProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply({
        gitServerData,
        gitServerSecretData,
    }: {
        gitServerData: EDPGitServerKubeObjectInterface;
        gitServerSecretData: EDPKubeObjectInterface;
    }): void;
    isApplying: boolean;
}
