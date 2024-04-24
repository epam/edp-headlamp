import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { JiraServerKubeObject } from '../../../k8s/JiraServer';
import { JiraServerKubeObjectInterface } from '../../../k8s/JiraServer/types';
import { createJiraServerInstance } from '../../../k8s/JiraServer/utils/createJiraServerInstance';
import { SecretKubeObject } from '../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import { createJiraIntegrationSecretInstance } from '../../../k8s/Secret/utils/createJiraIntegrationSecretInstance';
import { EDPKubeObjectInterface } from '../../../types/k8s';
import { getMutualLoadingStatusFromMutations } from '../../../utils/getLoadingStatusFromMutations';
import { ManageJiraCIFormValues } from '../types';
import { useFormContext } from './useFormContext';

enum SETUP_OPERATION {
  CREATE,
  EDIT,
}

enum SETUP_FLOW {
  CREATE_CREATE, // create JiraServer, create JiraServer secret if both don't exist
  EDIT_EDIT, // edit JiraServer, edit JiraServer secret if both exist
  CREATE_EDIT, // create JiraServer, edit JiraServer secret if only JiraServer exists
  EDIT_CREATE, // edit JiraServer, create JiraServer secret if only JiraServer secret exists
}

const getSetupFlow = (
  jiraServer: JiraServerKubeObjectInterface,
  jiraServerSecret: EDPKubeObjectInterface
) => {
  if (!jiraServer && !jiraServerSecret) {
    return SETUP_FLOW.CREATE_CREATE;
  }

  if (jiraServer && jiraServerSecret) {
    return SETUP_FLOW.EDIT_EDIT;
  }

  if (jiraServer && !jiraServerSecret) {
    return SETUP_FLOW.EDIT_CREATE;
  }

  if (!jiraServer && jiraServerSecret) {
    return SETUP_FLOW.CREATE_EDIT;
  }
};

const createNewJiraServerSecret = (
  formValues: ManageJiraCIFormValues
): SecretKubeObjectInterface => {
  const { username, password } = formValues;
  return createJiraIntegrationSecretInstance({ username, password });
};

const createNewJiraServer = (
  formValues: ManageJiraCIFormValues,
  operationWithJiraServer: SETUP_OPERATION,
  jiraServer?: JiraServerKubeObjectInterface
): JiraServerKubeObjectInterface => {
  const { url } = formValues;

  if (operationWithJiraServer === SETUP_OPERATION.CREATE) {
    return createJiraServerInstance(url);
  } else {
    const newJiraServer = {
      ...jiraServer,
      spec: {
        ...jiraServer.spec,
        apiUrl: url,
        rootUrl: url,
      },
    };
    return newJiraServer;
  }
};

export const useSetupJiraServer = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    formData: { jiraServer, jiraServerSecret },
  } = useFormContext();

  const setupFlow = getSetupFlow(jiraServer, jiraServerSecret);

  const jiraServerCreateMutation = useResourceCRUDMutation<
    JiraServerKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('jiraServerCreateMutation', JiraServerKubeObject, CRUD_TYPES.CREATE);

  const jiraServerEditMutation = useResourceCRUDMutation<
    JiraServerKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('jiraServerEditMutation', JiraServerKubeObject, CRUD_TYPES.EDIT);

  const jiraServerDeleteMutation = useResourceCRUDMutation<
    JiraServerKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('jiraServerDeleteMutation', JiraServerKubeObject, CRUD_TYPES.DELETE);

  const jiraServerSecretCreateMutation = useResourceCRUDMutation<
    SecretKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('jiraServerSecretCreateMutation', SecretKubeObject, CRUD_TYPES.CREATE);

  const jiraServerSecretEditMutation = useResourceCRUDMutation<
    SecretKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('jiraServerSecretEditMutation', SecretKubeObject, CRUD_TYPES.EDIT);

  const jiraServerSecretDeleteMutation = useResourceCRUDMutation<
    SecretKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('jiraServerSecretDeleteMutation', SecretKubeObject, CRUD_TYPES.DELETE);

  const setupJiraServer = async (formValues: ManageJiraCIFormValues) => {
    let jiraServerData: JiraServerKubeObjectInterface;
    let jiraServerSecretData: SecretKubeObjectInterface;

    switch (setupFlow) {
      case SETUP_FLOW.CREATE_CREATE: // create JiraServer, create JiraServer secret if both don't exist
        jiraServerData = createNewJiraServer(formValues, SETUP_OPERATION.CREATE);
        jiraServerSecretData = createNewJiraServerSecret(formValues);

        jiraServerCreateMutation.mutate(jiraServerData, {
          onSuccess: () => {
            jiraServerSecretCreateMutation.mutate(jiraServerSecretData, {
              onSuccess: onSuccess,
              onError: () => {
                jiraServerDeleteMutation.mutate(jiraServerData);
              },
            });
          },
        });

        break;
      case SETUP_FLOW.EDIT_EDIT: // edit JiraServer, edit JiraServer secret if both exist
        jiraServerData = createNewJiraServer(formValues, SETUP_OPERATION.EDIT, jiraServer);

        jiraServerSecretData = createNewJiraServerSecret(formValues);

        jiraServerEditMutation.mutate(jiraServerData, {
          onSuccess: () => {
            jiraServerSecretEditMutation.mutate(jiraServerSecretData, {
              onSuccess: onSuccess,
            });
          },
        });

        break;
      case SETUP_FLOW.CREATE_EDIT: // create JiraServer, edit JiraServer secret if only JiraServer exists
        jiraServerData = createNewJiraServer(formValues, SETUP_OPERATION.CREATE);

        jiraServerSecretData = createNewJiraServerSecret(formValues);

        jiraServerCreateMutation.mutate(jiraServerData, {
          onSuccess: () => {
            jiraServerSecretEditMutation.mutate(jiraServerSecretData, {
              onSuccess: onSuccess,
              onError: () => {
                jiraServerDeleteMutation.mutate(jiraServerData);
              },
            });
          },
        });

        break;

      case SETUP_FLOW.EDIT_CREATE: // edit JiraServer, create JiraServer secret if only JiraServer secret exists
        jiraServerData = createNewJiraServer(formValues, SETUP_OPERATION.EDIT, jiraServer);

        jiraServerSecretData = createNewJiraServerSecret(formValues);

        jiraServerEditMutation.mutate(jiraServerData, {
          onSuccess: () => {
            jiraServerSecretCreateMutation.mutate(jiraServerSecretData, {
              onSuccess: onSuccess,
            });
          },
        });

        break;
    }
  };

  const isLoading = getMutualLoadingStatusFromMutations([
    jiraServerCreateMutation,
    jiraServerEditMutation,
    jiraServerDeleteMutation,
    jiraServerSecretCreateMutation,
    jiraServerSecretEditMutation,
    jiraServerSecretDeleteMutation,
  ]);

  return { setupJiraServer, isLoading };
};
