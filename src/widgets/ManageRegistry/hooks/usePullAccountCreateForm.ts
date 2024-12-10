import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../k8s/groups/default/ConfigMap/constants';
import { REGISTRY_SECRET_NAMES } from '../../../k8s/groups/default/Secret/constants';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { createRegistrySecretInstance } from '../../../k8s/groups/default/Secret/utils/createRegistrySecretInstance';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { DOCKER_HUB_REGISTRY_ENDPOINT_VALUE, GHCR_ENDPOINT_VALUE } from '../constants';
import { PULL_ACCOUNT_FORM_NAMES } from '../names';
import { PullAccountFormValues, SharedFormValues, WidgetPermissions } from '../types';
import { getUsernameAndPassword } from '../utils';

export const usePullAccountCreateForm = ({
  pullAccountSecret,
  sharedForm,
  permissions,
}: {
  pullAccountSecret: SecretKubeObjectInterface;
  sharedForm: UseFormReturn<SharedFormValues, any, undefined>;
  permissions: WidgetPermissions;
}): FormItem => {
  const {
    createSecret,
    mutations: { secretCreateMutation },
  } = useSecretCRUD({});

  const defaultValues = React.useMemo(() => {
    const sharedValues = sharedForm.getValues();
    const { userName: pullUserName, password: pullPassword } =
      getUsernameAndPassword(pullAccountSecret);

    switch (sharedValues.registryType) {
      case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
      case CONTAINER_REGISTRY_TYPE.HARBOR:
      case CONTAINER_REGISTRY_TYPE.NEXUS:
        return {
          [PULL_ACCOUNT_FORM_NAMES.pullAccountPassword.name]: pullPassword || '',
          [PULL_ACCOUNT_FORM_NAMES.pullAccountUser.name]: pullUserName || '',
        };
      default:
        return {};
    }
  }, [pullAccountSecret, sharedForm]);

  const form = useForm<PullAccountFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    async (values: PullAccountFormValues) => {
      if (!permissions?.create?.Secret.allowed) {
        return false;
      }

      const sharedValues = sharedForm.getValues();
      switch (sharedValues.registryType) {
        case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
          await createSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.REGCRED,
              registryEndpoint: DOCKER_HUB_REGISTRY_ENDPOINT_VALUE,
              user: values.pullAccountUser,
              password: values.pullAccountPassword,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.GHCR:
          await createSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.REGCRED,
              registryEndpoint: GHCR_ENDPOINT_VALUE,
              user: values.pullAccountUser,
              password: values.pullAccountPassword,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.HARBOR:
        case CONTAINER_REGISTRY_TYPE.NEXUS:
          await createSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.REGCRED,
              registryEndpoint: sharedValues.registryEndpoint,
              user: values.pullAccountUser,
              password: values.pullAccountPassword,
            }),
          });
          break;
        default:
          break;
      }
    },
    [createSecret, permissions?.create?.Secret.allowed, sharedForm]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.CREATE,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: secretCreateMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions?.create?.Secret.allowed,
        reason: permissions?.create?.Secret.reason,
      },
    }),
    [
      form,
      handleSubmit,
      secretCreateMutation.isLoading,
      permissions?.create?.Secret.allowed,
      permissions?.create?.Secret.reason,
    ]
  );
};
