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

export const useSetupRegistry = ({ onSuccess }) => {
  const {
    formData: { tektonServiceAccount, EDPConfigMap, pushAccountSecret, pullAccountSecret },
  } = useFormContext<ManageRegistryDataContext>();

  const {
    createSecret,
    editSecret,
    mutations: { secretCreateMutation, secretEditMutation },
  } = useSecretCRUD({});

  const {
    editServiceAccount,
    mutations: { serviceAccountEditMutation },
  } = useEditServiceAccount({});

  const {
    editConfigMap,
    mutations: { configMapEditMutation },
  } = useConfigMapCRUD({
    onSuccess: onSuccess,
  });

  const isLoading =
    serviceAccountEditMutation.isLoading ||
    secretCreateMutation.isLoading ||
    configMapEditMutation.isLoading ||
    secretEditMutation.isLoading;

  const setupRegistry = async (formValues: ManageRegistryValues) => {
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

    const setupECR = async () => {
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

      if (!!pushAccountSecret) {
        await editSecret({ secretData: newECRSecretInstance });
      } else {
        await createSecret({ secretData: newECRSecretInstance });
      }

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const setupDockerHub = async () => {
      const newKanikoSecretInstance = createRegistrySecretInstance({
        name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
        registryEndpoint: 'https://index.docker.io/v1/',
        user: pushAccountUser,
        password: pushAccountPassword,
      });

      const newRegcredSecretInstance = createRegistrySecretInstance({
        name: REGISTRY_SECRET_NAMES.REGCRED,
        registryEndpoint: 'https://index.docker.io/v1/',
        user: pullAccountUser,
        password: pullAccountPassword,
      });

      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost: 'docker.io',
        registrySpace,
        registryType,
      });

      if (!!pushAccountSecret) {
        await editSecret({ secretData: newKanikoSecretInstance });
      } else {
        await createSecret({ secretData: newKanikoSecretInstance });
      }

      if (!!pullAccountSecret) {
        await editSecret({ secretData: newRegcredSecretInstance });
      } else {
        await createSecret({ secretData: newRegcredSecretInstance });
      }

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const setupHarborOrNexus = async () => {
      const newKanikoSecretInstance = createRegistrySecretInstance({
        name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
        registryEndpoint: registryHost,
        user: pushAccountUser,
        password: pushAccountPassword,
      });

      const newRegcredSecretInstance = createRegistrySecretInstance({
        name: REGISTRY_SECRET_NAMES.REGCRED,
        registryEndpoint: registryHost,
        user: pullAccountUser,
        password: pullAccountPassword,
      });

      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost,
        registrySpace,
        registryType,
      });

      if (!!pushAccountSecret) {
        await editSecret({ secretData: newKanikoSecretInstance });
      } else {
        await createSecret({ secretData: newKanikoSecretInstance });
      }

      if (!!pullAccountSecret) {
        await editSecret({ secretData: newRegcredSecretInstance });
      } else {
        await createSecret({ secretData: newRegcredSecretInstance });
      }

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const setupOpenshift = async () => {
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

      if (!!pushAccountSecret) {
        await editSecret({ secretData: newKanikoSecretInstance });
      } else {
        await createSecret({ secretData: newKanikoSecretInstance });
      }

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    switch (registryType) {
      case CONTAINER_REGISTRY_TYPE.ECR:
        await setupECR();
        break;
      case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
        await setupDockerHub();
        break;
      case CONTAINER_REGISTRY_TYPE.HARBOR:
      case CONTAINER_REGISTRY_TYPE.NEXUS:
        await setupHarborOrNexus();
        break;
      case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
        await setupOpenshift();
        break;
    }
  };

  return { setupRegistry, isLoading };
};
