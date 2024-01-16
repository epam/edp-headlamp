import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { GIT_PROVIDERS } from '../../../constants/gitProviders';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../k8s/common/editResource';
import { EDPGitServerKubeObject } from '../../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../../k8s/EDPGitServer/types';
import { createGitServerInstance } from '../../../k8s/EDPGitServer/utils/createGitServerInstance';
import { SecretKubeObject } from '../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import {
    createGerritGitServerSecretInstance,
    createGithubGitServerSecretInstance,
    createGitlabGitServerSecretInstance,
} from '../../../k8s/Secret/utils/createGitServerSecretInstance';
import { useFormContext } from '../../../providers/Form/hooks';
import { EDPKubeObjectInterface } from '../../../types/k8s';
import { safeEncode } from '../../../utils/decodeEncode';
import { getUsedValues } from '../../../utils/forms/getUsedValues';
import { getMutualLoadingStatusFromMutations } from '../../../utils/getLoadingStatusFromMutations';
import {
    GIT_SERVER_FORM_NAMES,
    GIT_SERVER_GERRIT_SECRET_FORM_NAMES,
    GIT_SERVER_GITHUB_SECRET_FORM_NAMES,
    GIT_SERVER_GITLAB_SECRET_FORM_NAMES,
} from '../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../types';
import { getGitServerSecret } from '../utils/getGitServerSecret';

enum SETUP_OPERATION {
    CREATE,
    EDIT,
}

enum SETUP_FLOW {
    CREATE_CREATE, // create GitServer, create GitServer secret if both don't exist
    EDIT_EDIT, // edit GitServer, edit GitServer secret if both exist
    CREATE_EDIT, // create GitServer, edit GitServer secret if only GitServer exists
    EDIT_CREATE, // edit GitServer, create GitServer secret if only GitServer secret exists
}

const getSetupFlow = (
    gitServer: EDPGitServerKubeObjectInterface,
    gitServerSecret: EDPKubeObjectInterface
) => {
    if (!gitServer && !gitServerSecret) {
        return SETUP_FLOW.CREATE_CREATE;
    }

    if (gitServer && gitServerSecret) {
        return SETUP_FLOW.EDIT_EDIT;
    }

    if (gitServer && !gitServerSecret) {
        return SETUP_FLOW.EDIT_CREATE;
    }

    if (!gitServer && gitServerSecret) {
        return SETUP_FLOW.CREATE_EDIT;
    }
};

const createNewGitServerSecret = (
    formValues: ManageGitServerValues,
    operationWithSecret: SETUP_OPERATION,
    gitServerSecret?: SecretKubeObjectInterface
): SecretKubeObjectInterface => {
    if (operationWithSecret === SETUP_OPERATION.CREATE) {
        switch (formValues.gitProvider) {
            case GIT_PROVIDERS.GERRIT:
                return createGerritGitServerSecretInstance({
                    sshPrivateKey: formValues.sshPrivateKey,
                    sshPublicKey: formValues.sshPublicKey,
                    username: formValues.gitUser,
                });
            case GIT_PROVIDERS.GITHUB:
                return createGithubGitServerSecretInstance({
                    sshPrivateKey: formValues.sshPrivateKey,
                    token: formValues.token,
                    username: formValues.gitUser,
                });
            case GIT_PROVIDERS.GITLAB:
                return createGitlabGitServerSecretInstance({
                    sshPrivateKey: formValues.sshPrivateKey,
                    token: formValues.token,
                });
            default:
                break;
        }
    } else {
        switch (formValues.gitProvider) {
            case GIT_PROVIDERS.GERRIT:
                return editResource(GIT_SERVER_GERRIT_SECRET_FORM_NAMES, gitServerSecret, {
                    sshPrivateKey: safeEncode(formValues.sshPrivateKey),
                    sshPublicKey: safeEncode(formValues.sshPublicKey),
                    gitUser: safeEncode(formValues.gitUser),
                });
            case GIT_PROVIDERS.GITHUB:
                return editResource(GIT_SERVER_GITHUB_SECRET_FORM_NAMES, gitServerSecret, {
                    sshPrivateKey: safeEncode(formValues.sshPrivateKey),
                    token: safeEncode(formValues.token),
                    gitUser: safeEncode(formValues.gitUser),
                });
            case GIT_PROVIDERS.GITLAB:
                return editResource(GIT_SERVER_GITLAB_SECRET_FORM_NAMES, gitServerSecret, {
                    sshPrivateKey: safeEncode(formValues.sshPrivateKey),
                    token: safeEncode(formValues.token),
                });
            default:
                break;
        }
    }
};

const createNewGitServer = (
    formValues: ManageGitServerValues,
    operationWithGitServer: SETUP_OPERATION,
    gitServer?: EDPGitServerKubeObjectInterface
): EDPGitServerKubeObjectInterface => {
    const transformedValues = {
        ...formValues,
        sshPort: Number(formValues.sshPort),
        httpsPort: Number(formValues.httpsPort),
    };
    const gitServerValues = getUsedValues(transformedValues, GIT_SERVER_FORM_NAMES);

    if (operationWithGitServer === SETUP_OPERATION.CREATE) {
        return createGitServerInstance(GIT_SERVER_FORM_NAMES, gitServerValues);
    } else {
        return editResource(GIT_SERVER_FORM_NAMES, gitServer, gitServerValues);
    }
};

export const useSetupGitServer = ({ onSuccess }: { onSuccess: () => void }) => {
    const {
        formData: { gitServer, repositorySecrets },
    } = useFormContext<ManageGitServerDataContext>();

    const { watch } = useReactHookFormContext();

    const gitProviderFieldValue = watch(GIT_SERVER_FORM_NAMES.gitProvider.name);

    const gitServerSecret = getGitServerSecret(gitServer, repositorySecrets, gitProviderFieldValue);

    const setupFlow = getSetupFlow(gitServer, gitServerSecret);

    const gitServerCreateMutation = useResourceCRUDMutation<
        EDPGitServerKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('gitServerCreateMutation', EDPGitServerKubeObject, CRUD_TYPES.CREATE);

    const gitServerEditMutation = useResourceCRUDMutation<
        EDPGitServerKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('gitServerEditMutation', EDPGitServerKubeObject, CRUD_TYPES.EDIT);

    const gitServerDeleteMutation = useResourceCRUDMutation<
        EDPGitServerKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('gitServerDeleteMutation', EDPGitServerKubeObject, CRUD_TYPES.DELETE);

    const gitServerSecretCreateMutation = useResourceCRUDMutation<
        SecretKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('gitServerSecretCreateMutation', SecretKubeObject, CRUD_TYPES.CREATE);

    const gitServerSecretEditMutation = useResourceCRUDMutation<
        SecretKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('gitServerSecretEditMutation', SecretKubeObject, CRUD_TYPES.EDIT);

    const gitServerSecretDeleteMutation = useResourceCRUDMutation<
        SecretKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('gitServerSecretDeleteMutation', SecretKubeObject, CRUD_TYPES.DELETE);

    const setupGitServer = async (formValues: ManageGitServerValues) => {
        let gitServerData: EDPGitServerKubeObjectInterface;
        let gitServerSecretData: SecretKubeObjectInterface;

        switch (setupFlow) {
            case SETUP_FLOW.CREATE_CREATE: // create GitServer, create GitServer secret if both don't exist
                gitServerData = createNewGitServer(formValues, SETUP_OPERATION.CREATE);
                gitServerSecretData = createNewGitServerSecret(formValues, SETUP_OPERATION.CREATE);

                gitServerCreateMutation.mutate(gitServerData, {
                    onSuccess: () => {
                        gitServerSecretCreateMutation.mutate(gitServerSecretData, {
                            onSuccess: onSuccess,
                            onError: () => {
                                gitServerDeleteMutation.mutate(gitServerData);
                            },
                        });
                    },
                });

                break;
            case SETUP_FLOW.EDIT_EDIT: // edit GitServer, edit GitServer secret if both exist
                gitServerData = createNewGitServer(formValues, SETUP_OPERATION.EDIT, gitServer);

                gitServerSecretData = createNewGitServerSecret(
                    formValues,
                    SETUP_OPERATION.EDIT,
                    gitServerSecret
                );

                gitServerEditMutation.mutate(gitServerData, {
                    onSuccess: () => {
                        gitServerSecretEditMutation.mutate(gitServerSecretData, {
                            onSuccess: onSuccess,
                        });
                    },
                });

                break;
            case SETUP_FLOW.CREATE_EDIT: // create GitServer, edit GitServer secret if only GitServer exists
                gitServerData = createNewGitServer(formValues, SETUP_OPERATION.CREATE);

                gitServerSecretData = createNewGitServerSecret(
                    formValues,
                    SETUP_OPERATION.EDIT,
                    gitServerSecret
                );

                gitServerCreateMutation.mutate(gitServerData, {
                    onSuccess: () => {
                        gitServerSecretEditMutation.mutate(gitServerSecretData, {
                            onSuccess: onSuccess,
                            onError: () => {
                                gitServerDeleteMutation.mutate(gitServerData);
                            },
                        });
                    },
                });

                break;

            case SETUP_FLOW.EDIT_CREATE: // edit GitServer, create GitServer secret if only GitServer secret exists
                gitServerData = createNewGitServer(formValues, SETUP_OPERATION.EDIT, gitServer);

                gitServerSecretData = createNewGitServerSecret(formValues, SETUP_OPERATION.CREATE);

                gitServerEditMutation.mutate(gitServerData, {
                    onSuccess: () => {
                        gitServerSecretCreateMutation.mutate(gitServerSecretData, {
                            onSuccess: onSuccess,
                        });
                    },
                });

                break;
        }
    };

    const isLoading = getMutualLoadingStatusFromMutations([
        gitServerCreateMutation,
        gitServerEditMutation,
        gitServerDeleteMutation,
        gitServerSecretCreateMutation,
        gitServerSecretEditMutation,
        gitServerSecretDeleteMutation,
    ]);

    return { setupGitServer, isLoading };
};
