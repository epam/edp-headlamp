import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../k8s/groups/default/ConfigMap/constants';
import { REGISTRY_SECRET_NAMES } from '../../../k8s/groups/default/Secret/constants';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { createRegistrySecretInstance } from '../../../k8s/groups/default/Secret/utils/createRegistrySecretInstance';
import { DOCKER_HUB_REGISTRY_ENDPOINT_VALUE, GHCR_ENDPOINT_VALUE } from '../constants';
import { PULL_ACCOUNT_FORM_NAMES } from '../names';
import { PullAccountFormValues, SharedFormValues } from '../types';
import { getUsernameAndPassword } from '../utils';

export const usePullAccountEditForm = ({
  pullAccountSecret,
  sharedForm,
}: {
  pullAccountSecret: SecretKubeObjectInterface;
  sharedForm: UseFormReturn<SharedFormValues, any, undefined>;
}) => {
  const {
    editSecret,
    mutations: { secretEditMutation },
  } = useSecretCRUD({});

  const defaultValues = React.useMemo(() => {
    const { userName: pullUserName, password: pullPassword } =
      getUsernameAndPassword(pullAccountSecret);

    return {
      [PULL_ACCOUNT_FORM_NAMES.pullAccountPassword.name]: pullPassword || '',
      [PULL_ACCOUNT_FORM_NAMES.pullAccountUser.name]: pullUserName || '',
    };
  }, [pullAccountSecret]);

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
          await editSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.REGCRED,
              registryEndpoint: DOCKER_HUB_REGISTRY_ENDPOINT_VALUE,
              user: values.pullAccountUser,
              password: values.pullAccountPassword,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.GHCR:
          await editSecret({
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
          await editSecret({
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
    [editSecret, sharedForm]
  );

  return React.useMemo(
    () => ({ form, mutation: secretEditMutation, handleSubmit }),
    [form, secretEditMutation, handleSubmit]
  );
};
