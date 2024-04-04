import React from 'react';
import { useForm } from 'react-hook-form';
import { editResource } from '../../../k8s/common/editResource';
import { IRSA_ROLE_ARN_ANNOTATION } from '../../../k8s/ServiceAccount/constants';
import { useEditServiceAccount } from '../../../k8s/ServiceAccount/hooks/useEditServiceAccount';
import { ServiceAccountKubeObjectInterface } from '../../../k8s/ServiceAccount/types';
import { SERVICE_ACCOUNT_FORM_NAMES } from '../names';
import { ServiceAccountFormValues } from '../types';

export const useServiceAccountEditForm = ({
  tektonServiceAccount,
}: {
  tektonServiceAccount: ServiceAccountKubeObjectInterface;
}) => {
  const {
    editServiceAccount,
    mutations: { serviceAccountEditMutation },
  } = useEditServiceAccount({});

  const defaultValues = React.useMemo(() => {
    return {
      [SERVICE_ACCOUNT_FORM_NAMES.irsaRoleArn.name]:
        tektonServiceAccount?.metadata?.annotations?.[IRSA_ROLE_ARN_ANNOTATION],
    };
  }, [tektonServiceAccount]);

  const form = useForm<ServiceAccountFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    async (values: ServiceAccountFormValues) => {
      const updatedServiceAccount = editResource(
        SERVICE_ACCOUNT_FORM_NAMES,
        tektonServiceAccount as ServiceAccountKubeObjectInterface,
        values
      );
      editServiceAccount({ serviceAccount: updatedServiceAccount });
    },
    [editServiceAccount, tektonServiceAccount]
  );

  return React.useMemo(
    () => ({ form, mutation: serviceAccountEditMutation, handleSubmit }),
    [form, serviceAccountEditMutation, handleSubmit]
  );
};
