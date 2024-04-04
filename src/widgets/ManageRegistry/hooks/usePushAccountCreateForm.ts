import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../k8s/ConfigMap/constants';
import { REGISTRY_SECRET_NAMES } from '../../../k8s/Secret/constants';
import { useSecretCRUD } from '../../../k8s/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import {
  createECRPushSecretInstance,
  createOpenshiftPushSecretInstance,
  createRegistrySecretInstance,
} from '../../../k8s/Secret/utils/createRegistrySecretInstance';
import { DOCKER_HUB_REGISTRY_ENDPOINT_VALUE } from '../constants';
import { PUSH_ACCOUNT_FORM_NAMES } from '../names';
import { PushAccountFormValues, SharedFormValues } from '../types';
import { getAuth, getUsernameAndPassword } from '../utils';

export const usePushAccountCreateForm = ({
  pushAccountSecret,
  sharedForm,
}: {
  pushAccountSecret: SecretKubeObjectInterface;
  sharedForm: UseFormReturn<SharedFormValues, any, undefined>;
}) => {
  const {
    createSecret,
    mutations: { secretCreateMutation },
  } = useSecretCRUD({});

  const defaultValues = React.useMemo(() => {
    const sharedValues = sharedForm.getValues();

    const { auth } = getAuth(pushAccountSecret);

    const { userName: pushUserName, password: pushPassword } =
      getUsernameAndPassword(pushAccountSecret);

    switch (sharedValues.registryType) {
      case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
      case CONTAINER_REGISTRY_TYPE.HARBOR:
      case CONTAINER_REGISTRY_TYPE.NEXUS:
        return {
          [PUSH_ACCOUNT_FORM_NAMES.pushAccountPassword.name]: pushPassword || '',
          [PUSH_ACCOUNT_FORM_NAMES.pushAccountUser.name]: pushUserName || '',
        };

      case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
        return {
          [PUSH_ACCOUNT_FORM_NAMES.pushAccountPassword.name]: auth || '',
        };
      default:
        return {};
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
      const sharedValues = sharedForm.getValues();

      switch (sharedValues.registryType) {
        case CONTAINER_REGISTRY_TYPE.ECR:
          await createSecret({
            secretData: createECRPushSecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
          await createSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
              registryEndpoint: DOCKER_HUB_REGISTRY_ENDPOINT_VALUE,
              user: values.pushAccountUser,
              password: values.pushAccountPassword,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.HARBOR:
        case CONTAINER_REGISTRY_TYPE.NEXUS:
          await createSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
              registryEndpoint: sharedValues.registryEndpoint,
              user: values.pushAccountUser,
              password: values.pushAccountPassword,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
          await createSecret({
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
    [createSecret, sharedForm]
  );

  return React.useMemo(
    () => ({ form, mutation: secretCreateMutation, handleSubmit }),
    [form, secretCreateMutation, handleSubmit]
  );
};
