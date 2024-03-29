import React from 'react';
import { useForm } from 'react-hook-form';
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
import { PushAccountFormValues } from '../types';
import { getAuth, getUsernameAndPassword } from '../utils';

export const usePushAccountEditForm = ({
  pushAccountSecret,
  registryEndpoint,
  registryType,
}: {
  pushAccountSecret: SecretKubeObjectInterface;
  registryEndpoint: string;
  registryType: string;
}) => {
  const {
    editSecret,
    mutations: { secretEditMutation },
  } = useSecretCRUD({});

  const defaultValues = React.useMemo(() => {
    const { auth } = getAuth(pushAccountSecret);

    const { userName: pushUserName, password: pushPassword } =
      getUsernameAndPassword(pushAccountSecret);

    switch (registryType) {
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
  }, [pushAccountSecret, registryType]);

  const form = useForm<PushAccountFormValues>({
    defaultValues: defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: PushAccountFormValues) => {
      switch (registryType) {
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
        case CONTAINER_REGISTRY_TYPE.HARBOR:
        case CONTAINER_REGISTRY_TYPE.NEXUS:
          await editSecret({
            secretData: createRegistrySecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
              registryEndpoint: registryEndpoint,
              user: values.pushAccountUser,
              password: values.pushAccountPassword,
            }),
          });
          break;
        case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
          await editSecret({
            secretData: createOpenshiftPushSecretInstance({
              name: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
              registryEndpoint: registryEndpoint,
              token: values.pushAccountPassword,
            }),
          });
          break;
        default:
          break;
      }
    },
    [editSecret, registryEndpoint, registryType]
  );

  return React.useMemo(
    () => ({ form, mutation: secretEditMutation, handleSubmit }),
    [form, secretEditMutation, handleSubmit]
  );
};
