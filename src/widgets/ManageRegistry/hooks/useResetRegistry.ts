import { editResource } from '../../../k8s/common/editResource';
import { CONTAINER_REGISTRY_TYPE } from '../../../k8s/groups/default/ConfigMap/constants';
import { useConfigMapCRUD } from '../../../k8s/groups/default/ConfigMap/hooks/useConfigMapCRUD';
import { ConfigMapKubeObjectInterface } from '../../../k8s/groups/default/ConfigMap/types';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { useEditServiceAccount } from '../../../k8s/groups/default/ServiceAccount/hooks/useEditServiceAccount';
import { ServiceAccountKubeObjectInterface } from '../../../k8s/groups/default/ServiceAccount/types';
import { CONFIG_MAP_FORM_NAMES, SERVICE_ACCOUNT_FORM_NAMES } from '../names';

export const useResetRegistry = ({
  EDPConfigMap,
  pushAccountSecret,
  pullAccountSecret,
  tektonServiceAccount,
  onSuccess,
}: {
  EDPConfigMap: ConfigMapKubeObjectInterface | undefined;
  pushAccountSecret: SecretKubeObjectInterface | undefined;
  pullAccountSecret: SecretKubeObjectInterface | undefined;
  tektonServiceAccount: ServiceAccountKubeObjectInterface | undefined;
  onSuccess: () => void;
}) => {
  const registryType = EDPConfigMap?.data.container_registry_type;
  const secretsArray = [pushAccountSecret, pullAccountSecret].filter(Boolean);

  const {
    editConfigMap,
    mutations: { configMapEditMutation },
  } = useConfigMapCRUD({ onSuccess });

  const {
    deleteSecret,
    mutations: { secretDeleteMutation },
  } = useSecretCRUD({});

  const {
    editServiceAccount,
    mutations: { serviceAccountEditMutation },
  } = useEditServiceAccount({});

  const isLoading =
    serviceAccountEditMutation.isLoading ||
    secretDeleteMutation.isLoading ||
    configMapEditMutation.isLoading;

  const resetRegistry = async () => {
    if (!EDPConfigMap) {
      return;
    }

    const resetECR = async () => {
      const newEDPConfigMap = editResource(CONFIG_MAP_FORM_NAMES, EDPConfigMap, {
        [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: '',
        [CONFIG_MAP_FORM_NAMES.registrySpace.name]: '',
        [CONFIG_MAP_FORM_NAMES.registryType.name]: '',
        [CONFIG_MAP_FORM_NAMES.awsRegion.name]: '',
      });

      const editedServiceAccount = editResource(
        SERVICE_ACCOUNT_FORM_NAMES,
        tektonServiceAccount as ServiceAccountKubeObjectInterface,
        {
          [SERVICE_ACCOUNT_FORM_NAMES.irsaRoleArn.name]: '',
        }
      );

      for (const secret of secretsArray) {
        if (!secret) {
          continue;
        }

        await deleteSecret({ secretData: secret });
      }

      await editServiceAccount({ serviceAccount: editedServiceAccount });

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const resetDockerHub = async () => {
      const newEDPConfigMap = editResource(CONFIG_MAP_FORM_NAMES, EDPConfigMap, {
        [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: '',
        [CONFIG_MAP_FORM_NAMES.registrySpace.name]: '',
        [CONFIG_MAP_FORM_NAMES.registryType.name]: '',
      });

      for (const secret of secretsArray) {
        if (!secret) {
          continue;
        }

        await deleteSecret({ secretData: secret });
      }
      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const resetGHCR = async () => {
      const newEDPConfigMap = editResource(CONFIG_MAP_FORM_NAMES, EDPConfigMap, {
        [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: '',
        [CONFIG_MAP_FORM_NAMES.registrySpace.name]: '',
        [CONFIG_MAP_FORM_NAMES.registryType.name]: '',
      });

      for (const secret of secretsArray) {
        if (!secret) {
          continue;
        }

        await deleteSecret({ secretData: secret });
      }
      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const resetHarborOrNexus = async () => {
      const newEDPConfigMap = editResource(CONFIG_MAP_FORM_NAMES, EDPConfigMap, {
        [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: '',
        [CONFIG_MAP_FORM_NAMES.registrySpace.name]: '',
        [CONFIG_MAP_FORM_NAMES.registryType.name]: '',
      });

      for (const secret of secretsArray) {
        if (!secret) {
          continue;
        }

        await deleteSecret({ secretData: secret });
      }
      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const resetOpenshift = async () => {
      const newEDPConfigMap = editResource(CONFIG_MAP_FORM_NAMES, EDPConfigMap, {
        [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: '',
        [CONFIG_MAP_FORM_NAMES.registrySpace.name]: '',
        [CONFIG_MAP_FORM_NAMES.registryType.name]: '',
      });

      if (pushAccountSecret) {
        await deleteSecret({ secretData: pushAccountSecret });
      }

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    switch (registryType) {
      case CONTAINER_REGISTRY_TYPE.ECR:
        await resetECR();
        break;
      case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
        await resetDockerHub();
        break;
      case CONTAINER_REGISTRY_TYPE.GHCR:
        await resetGHCR();
        break;
      case CONTAINER_REGISTRY_TYPE.HARBOR:
      case CONTAINER_REGISTRY_TYPE.NEXUS:
        await resetHarborOrNexus();
        break;
      case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
        await resetOpenshift();
        break;
    }
  };

  return { resetRegistry, isLoading };
};
