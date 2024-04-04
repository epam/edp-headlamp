import React from 'react';
import { useForm } from 'react-hook-form';
import { ConfigMapKubeObjectInterface } from '../../../k8s/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import { SHARED_FORM_NAMES } from '../names';
import { SharedFormValues } from '../types';
import { getUsernameAndPassword } from '../utils';

export const useSharedForm = ({
  EDPConfigMap,
  pushAccountSecret,
  pullAccountSecret,
}: {
  EDPConfigMap: ConfigMapKubeObjectInterface;
  pushAccountSecret: SecretKubeObjectInterface;
  pullAccountSecret: SecretKubeObjectInterface;
}) => {
  const { userName: pullUserName, password: pullPassword } =
    getUsernameAndPassword(pullAccountSecret);
  const { userName: pushUserName, password: pushPassword } =
    getUsernameAndPassword(pushAccountSecret);

  const useSameAccountValue = React.useMemo(() => {
    if (!pullUserName || !pushUserName) {
      return false;
    }

    const usernamesAreEqual = pullUserName === pushUserName;
    const passwordsAreEqual = pullPassword === pushPassword;

    if (usernamesAreEqual && passwordsAreEqual) {
      return true;
    }

    return false;
  }, [pullPassword, pullUserName, pushPassword, pushUserName]);

  const defaultValues = React.useMemo(() => {
    return {
      [SHARED_FORM_NAMES.registryEndpoint.name]: EDPConfigMap?.data.container_registry_host,
      [SHARED_FORM_NAMES.registryType.name]: EDPConfigMap?.data.container_registry_type,
      [SHARED_FORM_NAMES.useSameAccount.name]: useSameAccountValue,
    };
  }, [
    EDPConfigMap?.data.container_registry_host,
    EDPConfigMap?.data.container_registry_type,
    useSameAccountValue,
  ]);

  const form = useForm<SharedFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  return React.useMemo(() => ({ form }), [form]);
};
