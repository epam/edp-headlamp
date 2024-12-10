import React from 'react';
import { useForm } from 'react-hook-form';
import { editResource } from '../../../k8s/common/editResource';
import { IRSA_ROLE_ARN_ANNOTATION } from '../../../k8s/groups/default/ServiceAccount/constants';
import { useEditServiceAccount } from '../../../k8s/groups/default/ServiceAccount/hooks/useEditServiceAccount';
import { ServiceAccountKubeObjectInterface } from '../../../k8s/groups/default/ServiceAccount/types';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { SERVICE_ACCOUNT_FORM_NAMES } from '../names';
import { ServiceAccountFormValues, WidgetPermissions } from '../types';

export const useServiceAccountEditForm = ({
  tektonServiceAccount,
  permissions,
}: {
  tektonServiceAccount: ServiceAccountKubeObjectInterface;
  permissions: WidgetPermissions;
}): FormItem => {
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
      if (!permissions?.update?.ServiceAccount.allowed) {
        return false;
      }

      const updatedServiceAccount = editResource(
        SERVICE_ACCOUNT_FORM_NAMES,
        tektonServiceAccount as ServiceAccountKubeObjectInterface,
        values
      );
      editServiceAccount({ serviceAccount: updatedServiceAccount });
    },
    [editServiceAccount, permissions?.update?.ServiceAccount.allowed, tektonServiceAccount]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.EDIT,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: serviceAccountEditMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions?.update?.ServiceAccount.allowed,
        reason: permissions?.update?.ServiceAccount.reason,
      },
    }),
    [
      form,
      handleSubmit,
      serviceAccountEditMutation.isLoading,
      permissions?.update?.ServiceAccount.allowed,
      permissions?.update?.ServiceAccount.reason,
    ]
  );
};
