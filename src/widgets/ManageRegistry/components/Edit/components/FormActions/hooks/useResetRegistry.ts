import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { editResource } from '../../../../../../../k8s/common/editResource';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../../../k8s/ConfigMap/constants';
import { useConfigMapCRUD } from '../../../../../../../k8s/ConfigMap/hooks/useConfigMapCRUD';
import { useSecretCRUD } from '../../../../../../../k8s/Secret/hooks/useSecretCRUD';
import { useEditServiceAccount } from '../../../../../../../k8s/ServiceAccount/hooks/useEditServiceAccount';
import { ServiceAccountKubeObjectInterface } from '../../../../../../../k8s/ServiceAccount/types';
import { EDP_CONFIG_MAP_NAMES } from '../../../../../../../pages/edp-configuration/pages/edp-registry-list/names';
import { useFormContext } from '../../../../../../../providers/Form/hooks';
import { ManageRegistryDataContext } from '../../../../../types';

export const useResetRegistry = ({ onSuccess }) => {
  const { getValues } = useReactHookFormContext();
  const {
    formData: { tektonServiceAccount, EDPConfigMap, pushAccountSecret, pullAccountSecret },
  } = useFormContext<ManageRegistryDataContext>();

  const secretsArray = [pushAccountSecret, pullAccountSecret].filter(Boolean);

  const {
    editConfigMap,
    mutations: { configMapEditMutation },
  } = useConfigMapCRUD({
    onSuccess: onSuccess,
  });

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
    const formValues = getValues();

    const { registryType, irsaRoleArn } = formValues;

    const resetECR = async () => {
      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost: '',
        registrySpace: '',
        registryType: '',
        awsRegion: '',
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
          irsaRoleArn: '',
        }
      );

      for (const secret of secretsArray) {
        await deleteSecret({ secretData: secret });
      }

      await editServiceAccount({ serviceAccount: editedServiceAccount });
      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const resetDockerHub = async () => {
      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost: '',
        registrySpace: '',
        registryType: '',
      });

      for (const secret of secretsArray) {
        await deleteSecret({ secretData: secret });
      }
      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const resetHarbor = async () => {
      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost: '',
        registrySpace: '',
        registryType: '',
      });

      for (const secret of secretsArray) {
        await deleteSecret({ secretData: secret });
      }
      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    const resetOpenshift = async () => {
      const newEDPConfigMap = editResource(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
        registryHost: '',
        registrySpace: '',
        registryType: '',
      });

      await deleteSecret({ secretData: pushAccountSecret });

      await editConfigMap({ configMapData: newEDPConfigMap });
    };

    switch (registryType) {
      case CONTAINER_REGISTRY_TYPE.ECR:
        await resetECR();
        break;
      case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
        await resetDockerHub();
        break;
      case CONTAINER_REGISTRY_TYPE.HARBOR:
        await resetHarbor();
        break;
      case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
        await resetOpenshift();
        break;
    }
  };

  return { resetRegistry, isLoading };
};
