import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../k8s/groups/default/ConfigMap/constants';
import { REGISTRY_SECRET_NAMES } from '../../../k8s/groups/default/Secret/constants';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import {
  createECRPushSecretInstance,
  createOpenshiftPushSecretInstance,
  createRegistrySecretInstance,
} from '../../../k8s/groups/default/Secret/utils/createRegistrySecretInstance';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { DOCKER_HUB_REGISTRY_ENDPOINT_VALUE, GHCR_ENDPOINT_VALUE } from '../constants';
import { PUSH_ACCOUNT_FORM_NAMES } from '../names';
import { PushAccountFormValues, SharedFormValues, WidgetPermissions } from '../types';
import { getAuth, getUsernameAndPassword } from '../utils';

export const usePushAccountEditForm = ({
  pushAccountSecret,
  sharedForm,
  permissions,
}: {
  pushAccountSecret: SecretKubeObjectInterface | undefined;
  sharedForm: UseFormReturn<SharedFormValues, any, undefined>;
  permissions: WidgetPermissions;
}): FormItem => {
  const {
    editSecret,
    mutations: { secretEditMutation },
  } = useSecretCRUD({});

  const defaultValues = React.useMemo(() => {
    const sharedValues = sharedForm.getValues();

    const { auth } = getAuth(pushAccountSecret);

    const { userName: pushUserName, password: pushPassword } =
      getUsernameAndPassword(pushAccountSecret);

    switch (sharedValues.registryType) {
      case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
        return {
          [PUSH_ACCOUNT_FORM_NAMES.pushAccountPassword.name]: auth || '',
        };
      default:
        return {
          [PUSH_ACCOUNT_FORM_NAMES.pushAccountPassword.name]: pushPassword || '',
          [PUSH_ACCOUNT_FORM_NAMES.pushAccountUser.name]: pushUserName || '',
        };
    }
  }, [pushAccountSecret, sharedForm]);

  const form = useForm<PushAccountFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    async (values: PushAccountFormValues) => {
      if (!permissions.update.Secret.allowed) {
        return false;
      }

      const sharedValues = sharedForm.getValues();

      switch (sharedValues.registryType) {
        case CONTAINER_REGISTRY_TYPE.ECR:
          await editSecret({
            secretData: createECRPushSecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
          await editSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
              registryEndpoint: DOCKER_HUB_REGISTRY_ENDPOINT_VALUE,
              user: values.pushAccountUser,
              password: values.pushAccountPassword,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.GHCR:
          await editSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
              registryEndpoint: GHCR_ENDPOINT_VALUE,
              user: values.pushAccountUser,
              password: values.pushAccountPassword,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.HARBOR:
        case CONTAINER_REGISTRY_TYPE.NEXUS:
          await editSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
              registryEndpoint: sharedValues.registryEndpoint,
              user: values.pushAccountUser,
              password: values.pushAccountPassword,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
          await editSecret({
            secretData: createOpenshiftPushSecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
              registryEndpoint: sharedValues.registryEndpoint,
              token: values.pushAccountPassword,
            }),
          });
          break;
        default:
          break;
      }
    },
    [editSecret, permissions.update.Secret.allowed, sharedForm]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.EDIT,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: secretEditMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions.update.Secret.allowed,
        reason: permissions.update.Secret.reason,
      },
    }),
    [
      form,
      handleSubmit,
      secretEditMutation.isLoading,
      permissions.update.Secret.allowed,
      permissions.update.Secret.reason,
    ]
  );
};
