import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../k8s/ConfigMap/constants';
import { REGISTRY_SECRET_NAMES } from '../../../k8s/Secret/constants';
import { useSecretCRUD } from '../../../k8s/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import { createRegistrySecretInstance } from '../../../k8s/Secret/utils/createRegistrySecretInstance';
import { DOCKER_HUB_REGISTRY_ENDPOINT_VALUE } from '../constants';
import { PULL_ACCOUNT_FORM_NAMES } from '../names';
import { PullAccountFormValues, SharedFormValues } from '../types';
import { getUsernameAndPassword } from '../utils';

export const usePullAccountCreateForm = ({
  pullAccountSecret,
  sharedForm,
}: {
  pullAccountSecret: SecretKubeObjectInterface;
  sharedForm: UseFormReturn<SharedFormValues, any, undefined>;
}) => {
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
    [createSecret, sharedForm]
  );

  return React.useMemo(
    () => ({ form, mutation: secretCreateMutation, handleSubmit }),
    [form, secretCreateMutation, handleSubmit]
  );
};
