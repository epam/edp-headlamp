import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { createCodemieSecretInstance } from '../../../k8s/groups/EDP/Codemie/utils/createCodemieSecretInstance';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { safeDecode } from '../../../utils/decodeEncode';
import { CODEMIE_SECRET_FORM_NAMES } from '../names';
import { CodemieSecretFormValues, WidgetPermissions } from '../types';

export const useCodemieSecretEditForm = ({
  handleClosePanel,
  secret,
  permissions,
}: {
  handleClosePanel: (() => void) | undefined;
  secret: SecretKubeObjectInterface | undefined;
  permissions: WidgetPermissions;
}): FormItem => {
  const {
    editSecret,
    mutations: { secretEditMutation },
  } = useSecretCRUD({
    onSuccess: handleClosePanel,
  });

  const defaultValues = React.useMemo(() => {
    return {
      [CODEMIE_SECRET_FORM_NAMES.clientId.name]: safeDecode(secret?.data?.client_id),
      [CODEMIE_SECRET_FORM_NAMES.clientSecret.name]: safeDecode(secret?.data?.client_secret),
      [CODEMIE_SECRET_FORM_NAMES.name.name]: 'codemie',
    };
  }, [secret]);

  const form = useForm<CodemieSecretFormValues>({
    defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: CodemieSecretFormValues) => {
      if (!permissions.update.Secret.allowed) {
        return false;
      }

      const secretInstance = createCodemieSecretInstance(CODEMIE_SECRET_FORM_NAMES, values);

      await editSecret({ secretData: secretInstance as SecretKubeObjectInterface });
    },
    [editSecret, permissions.update.Secret.allowed]
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
