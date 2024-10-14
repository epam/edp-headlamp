import React from 'react';
import { useForm } from 'react-hook-form';
import { editResource } from '../../../k8s/common/editResource';
import { CONTAINER_REGISTRY_TYPE } from '../../../k8s/groups/default/ConfigMap/constants';
import { useConfigMapCRUD } from '../../../k8s/groups/default/ConfigMap/hooks/useConfigMapCRUD';
import { ConfigMapKubeObjectInterface } from '../../../k8s/groups/default/ConfigMap/types';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { DOCKER_HUB_REGISTRY_ENDPOINT, GHCR_ENDPOINT } from '../constants';
import { CONFIG_MAP_FORM_NAMES } from '../names';
import { ConfigMapFormValues, WidgetPermissions } from '../types';

export const useConfigMapEditForm = ({
  EDPConfigMap,
  permissions,
}: {
  EDPConfigMap: ConfigMapKubeObjectInterface;
  permissions: WidgetPermissions;
}): FormItem => {
  const {
    editConfigMap,
    mutations: { configMapEditMutation },
  } = useConfigMapCRUD({});

  const defaultValues = React.useMemo(() => {
    const registryType = EDPConfigMap?.data.container_registry_type;

    switch (registryType) {
      case CONTAINER_REGISTRY_TYPE.ECR:
        return {
          [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]:
            EDPConfigMap?.data.container_registry_host || '',
          [CONFIG_MAP_FORM_NAMES.registryType.name]:
            EDPConfigMap?.data.container_registry_type || '',
          [CONFIG_MAP_FORM_NAMES.registrySpace.name]:
            EDPConfigMap?.data.container_registry_space || '',
          [CONFIG_MAP_FORM_NAMES.awsRegion.name]: EDPConfigMap?.data.aws_region || '',
        };
      case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
        return {
          [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: DOCKER_HUB_REGISTRY_ENDPOINT,
          [CONFIG_MAP_FORM_NAMES.registryType.name]:
            EDPConfigMap?.data.container_registry_type || '',
          [CONFIG_MAP_FORM_NAMES.registrySpace.name]:
            EDPConfigMap?.data.container_registry_space || '',
        };
      case CONTAINER_REGISTRY_TYPE.GHCR:
        return {
          [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: GHCR_ENDPOINT,
          [CONFIG_MAP_FORM_NAMES.registryType.name]:
            EDPConfigMap?.data.container_registry_type || '',
          [CONFIG_MAP_FORM_NAMES.registrySpace.name]:
            EDPConfigMap?.data.container_registry_space || '',
        };
      default:
        return {
          [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]:
            EDPConfigMap?.data.container_registry_host || '',
          [CONFIG_MAP_FORM_NAMES.registryType.name]:
            EDPConfigMap?.data.container_registry_type || '',
          [CONFIG_MAP_FORM_NAMES.registrySpace.name]:
            EDPConfigMap?.data.container_registry_space || '',
        };
    }
  }, [EDPConfigMap]);

  const form = useForm<ConfigMapFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const getUpdatedConfigMap = React.useCallback(
    (values: ConfigMapFormValues) => {
      switch (values.registryType) {
        case CONTAINER_REGISTRY_TYPE.ECR:
          return editResource(CONFIG_MAP_FORM_NAMES, EDPConfigMap, {
            [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: values.registryEndpoint,
            [CONFIG_MAP_FORM_NAMES.registrySpace.name]: values.registrySpace,
            [CONFIG_MAP_FORM_NAMES.registryType.name]: values.registryType,
            [CONFIG_MAP_FORM_NAMES.awsRegion.name]: values.awsRegion,
          });
        case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
          return editResource(CONFIG_MAP_FORM_NAMES, EDPConfigMap, {
            [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: DOCKER_HUB_REGISTRY_ENDPOINT,
            [CONFIG_MAP_FORM_NAMES.registrySpace.name]: values.registrySpace,
            [CONFIG_MAP_FORM_NAMES.registryType.name]: values.registryType,
          });
        case CONTAINER_REGISTRY_TYPE.GHCR:
          return editResource(CONFIG_MAP_FORM_NAMES, EDPConfigMap, {
            [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: GHCR_ENDPOINT,
            [CONFIG_MAP_FORM_NAMES.registrySpace.name]: values.registrySpace,
            [CONFIG_MAP_FORM_NAMES.registryType.name]: values.registryType,
          });
        case CONTAINER_REGISTRY_TYPE.HARBOR:
        case CONTAINER_REGISTRY_TYPE.NEXUS:
        case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
          return editResource(CONFIG_MAP_FORM_NAMES, EDPConfigMap, {
            [CONFIG_MAP_FORM_NAMES.registryEndpoint.name]: values.registryEndpoint,
            [CONFIG_MAP_FORM_NAMES.registrySpace.name]: values.registrySpace,
            [CONFIG_MAP_FORM_NAMES.registryType.name]: values.registryType,
          });
        default:
          break;
      }
    },
    [EDPConfigMap]
  );

  const handleSubmit = React.useCallback(
    async (values: ConfigMapFormValues) => {
      if (!permissions.update.ConfigMap.allowed) {
        return false;
      }

      const updatedConfigMap = getUpdatedConfigMap(values);
      editConfigMap({ configMapData: updatedConfigMap });
    },
    [editConfigMap, getUpdatedConfigMap, permissions.update.ConfigMap.allowed]
  );

  return React.useMemo(
    () => ({
      mode: EDPConfigMap?.data.container_registry_type === '' ? FORM_MODES.CREATE : FORM_MODES.EDIT,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: configMapEditMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions.update.ConfigMap.allowed,
        reason: permissions.update.ConfigMap.reason,
      },
    }),
    [
      EDPConfigMap?.data.container_registry_type,
      form,
      handleSubmit,
      configMapEditMutation.isLoading,
      permissions.update.ConfigMap.allowed,
      permissions.update.ConfigMap.reason,
    ]
  );
};
