import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { createCodemieSecretInstance } from '../../../k8s/groups/EDP/Codemie/utils/createCodemieSecretInstance';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { CODEMIE_SECRET_FORM_NAMES } from '../names';
import { CodemieSecretFormValues, WidgetPermissions } from '../types';

export const useCodemieSecretCreateForm = ({
  handleClosePanel,
  permissions,
}: {
  handleClosePanel: (() => void) | undefined;
  permissions: WidgetPermissions;
}): FormItem => {
  const {
    createSecret,
    mutations: { secretCreateMutation },
  } = useSecretCRUD({
    onSuccess: handleClosePanel,
  });

  const defaultValues = React.useMemo(() => {
    return {
      [CODEMIE_SECRET_FORM_NAMES.name.name]: 'codemie',
    };
  }, []);

  const form = useForm<CodemieSecretFormValues>({ defaultValues: defaultValues });

  const handleSubmit = React.useCallback(
    async (values: CodemieSecretFormValues) => {
      if (!permissions.create.Secret.allowed) {
        return false;
      }

      const secretInstance = createCodemieSecretInstance(CODEMIE_SECRET_FORM_NAMES, values);

      await createSecret({ secretData: secretInstance as SecretKubeObjectInterface });
    },
    [createSecret, permissions.create.Secret.allowed]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.CREATE,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: secretCreateMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions.create.Secret.allowed,
        reason: permissions.create.Secret.reason,
      },
    }),
    [
      form,
      handleSubmit,
      secretCreateMutation.isLoading,
      permissions.create.Secret.allowed,
      permissions.create.Secret.reason,
    ]
  );
};
