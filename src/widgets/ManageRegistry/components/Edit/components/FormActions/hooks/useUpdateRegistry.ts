import { editResource } from '../../../../../../../k8s/common/editResource';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../../../k8s/ConfigMap/constants';
import { useConfigMapCRUD } from '../../../../../../../k8s/ConfigMap/hooks/useConfigMapCRUD';
import { REGISTRY_SECRET_NAMES } from '../../../../../../../k8s/Secret/constants';
import { useSecretCRUD } from '../../../../../../../k8s/Secret/hooks/useSecretCRUD';
import {
  createECRPushSecretInstance,
  createOpenshiftPushSecretInstance,
  createRegistrySecretInstance,
} from '../../../../../../../k8s/Secret/utils/createRegistrySecretInstance';
import { useEditServiceAccount } from '../../../../../../../k8s/ServiceAccount/hooks/useEditServiceAccount';
import { ServiceAccountKubeObjectInterface } from '../../../../../../../k8s/ServiceAccount/types';
import { EDP_CONFIG_MAP_NAMES } from '../../../../../../../pages/edp-configuration/pages/edp-registry-list/names';
import { useFormContext } from '../../../../../../../providers/Form/hooks';
import { ManageRegistryDataContext, ManageRegistryValues } from '../../../../../types';

export const useUpdateRegistry = ({ onSuccess }) => {
  const {
    formData: { tektonServiceAccount, EDPConfigMap },
  } = useFormContext<ManageRegistryDataContext>();

  const {
    editConfigMap,
    mutations: { configMapEditMutation },
  } = useConfigMapCRUD({
    onSuccess: onSuccess,
  });

  const {
    editSecret,
    mutations: { secretEditMutation },
  } = useSecretCRUD({});

  const {
    editServiceAccount,
    mutations: { serviceAccountEditMutation },
  } = useEditServiceAccount({});

  const isLoading =
    serviceAccountEditMutation.isLoading ||
    secretEditMutation.isLoading ||
    configMapEditMutation.isLoading;

  const updateRegistry = async (formValues: ManageRegistryValues) => {
    const {
      registryType,
      registryHost,
      registrySpace,
      awsRegion,
      irsaRoleArn,
      pullAccountPassword,
      pullAccountUser,
      pushAccountPassword,
      pushAccountUser,
    } = formValues;

    const updateECR = async () => {
      const newECRSecretInstance = createECRPushSecretInstance({
        name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
      });

      const editedServiceAccount = editResource(
        {
          irsaRoleArn: {
            name: irsaRoleArn,
            path: ['metadata', 'annotations', 'eks.amazonaws.com/role-arn'],
          },
        },
        tektonServiceAccount as ServiceAccountKubeObjectInterface,
        {
          irsaRoleArn,
        }
      );

      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost,
        registrySpace,
        registryType,
        awsRegion,
      });

      await editServiceAccount({ serviceAccount: editedServiceAccount });
      await editSecret({ secretData: newECRSecretInstance });
      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const updateDockerHub = async () => {
      const registrySecretInstances = [
        createRegistrySecretInstance({
          name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
          registryEndpoint: 'https://index.docker.io/v1/',
          user: pushAccountUser,
          password: pushAccountPassword,
        }),
        createRegistrySecretInstance({
          name: REGISTRY_SECRET_NAMES.REGCRED,
          registryEndpoint: 'https://index.docker.io/v1/',
          user: pullAccountUser,
          password: pullAccountPassword,
        }),
      ];

      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost: 'docker.io',
        registrySpace,
        registryType,
      });

      for (const registrySecretInstance of registrySecretInstances) {
        await editSecret({ secretData: registrySecretInstance });
      }

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const updateHarbor = async () => {
      const registrySecretInstances = [
        createRegistrySecretInstance({
          name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
          registryEndpoint: registryHost,
          user: pushAccountUser,
          password: pushAccountPassword,
        }),
        createRegistrySecretInstance({
          name: REGISTRY_SECRET_NAMES.REGCRED,
          registryEndpoint: registryHost,
          user: pullAccountUser,
          password: pullAccountPassword,
        }),
      ];

      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost,
        registrySpace,
        registryType,
      });

      for (const registrySecretInstance of registrySecretInstances) {
        await editSecret({ secretData: registrySecretInstance });
      }

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const updateOpenshift = async () => {
      const newKanikoSecretInstance = createOpenshiftPushSecretInstance({
        name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
        registryEndpoint: registryHost,
        token: pushAccountPassword,
      });

      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost,
        registrySpace,
        registryType,
      });

      await editSecret({ secretData: newKanikoSecretInstance });

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    switch (registryType) {
      case CONTAINER_REGISTRY_TYPE.ECR:
        await updateECR();
        break;
      case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
        await updateDockerHub();
        break;
      case CONTAINER_REGISTRY_TYPE.HARBOR:
        await updateHarbor();
        break;
      case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
        await updateOpenshift();
        break;
    }
  };

  return { updateRegistry, isLoading };
};
