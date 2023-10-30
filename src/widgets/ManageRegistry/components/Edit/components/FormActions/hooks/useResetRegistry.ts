import { CONTAINER_REGISTRY_TYPE } from '../../../../../../../k8s/ConfigMap/constants';
import { useConfigMapCRUD } from '../../../../../../../k8s/ConfigMap/hooks/useConfigMapCRUD';
import { editEDPConfigConfigMap } from '../../../../../../../k8s/ConfigMap/utils/editEDPConfigConfigMap';
import { useSecretCRUD } from '../../../../../../../k8s/Secret/hooks/useSecretCRUD';
import { useEditServiceAccount } from '../../../../../../../k8s/ServiceAccount/hooks/useEditServiceAccount';
import { ServiceAccountKubeObjectInterface } from '../../../../../../../k8s/ServiceAccount/types';
import { editServiceAccountInstance } from '../../../../../../../k8s/ServiceAccount/utils/editServiceAccount';
import { EDP_CONFIG_MAP_NAMES } from '../../../../../../../pages/edp-configuration/pages/edp-registry-list/names';
import { useFormContext } from '../../../../../../../providers/Form/hooks';
import { ManageRegistryDataContext, ManageRegistryValues } from '../../../../../types';

export const useResetRegistry = ({ onSuccess }) => {
    const {
        formData: { tektonServiceAccount, EDPConfigMap, pushAccountSecret, pullAccountSecret },
    } = useFormContext<ManageRegistryDataContext>();

    const secretsArray = [pushAccountSecret, pullAccountSecret].filter(Boolean);

    const {
        editConfigMap,
        mutations: { configMapEditMutation },
    } = useConfigMapCRUD({});

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

    const resetRegistry = async (formValues: ManageRegistryValues) => {
        const { registryType, irsaRoleArn } = formValues;

        const resetECR = async () => {
            const newEDPConfigMap = editEDPConfigConfigMap(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
                registryHost: '',
                registrySpace: '',
                registryType: '',
            });

            const editedServiceAccount = editServiceAccountInstance(
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

            if (onSuccess) {
                await onSuccess();
            }
        };

        const resetDockerHub = async () => {
            const newEDPConfigMap = editEDPConfigConfigMap(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
                registryHost: '',
                registrySpace: '',
                registryType: '',
            });

            for (const secret of secretsArray) {
                await deleteSecret({ secretData: secret });
            }
            await editConfigMap({ configMapData: newEDPConfigMap });

            if (onSuccess) {
                await onSuccess();
            }
        };

        const resetHarbor = async () => {
            const newEDPConfigMap = editEDPConfigConfigMap(EDP_CONFIG_MAP_NAMES, EDPConfigMap, {
                registryHost: '',
                registrySpace: '',
                registryType: '',
            });

            for (const secret of secretsArray) {
                await deleteSecret({ secretData: secret });
            }
            await editConfigMap({ configMapData: newEDPConfigMap });

            if (onSuccess) {
                await onSuccess();
            }

            if (onSuccess) {
                await onSuccess();
            }
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
                break;
        }
    };

    return { resetRegistry, isLoading };
};
