import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { createSonarQubeIntegrationSecretInstance } from '../../../k8s/groups/default/Secret/utils/createSonarQubeIntegrationSecretInstance';
import { FORM_MODES } from '../../../types/forms';
import { safeDecode } from '../../../utils/decodeEncode';
import { INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { IntegrationSecretFormValues, WidgetPermissions } from '../types';

export const useSecretEditForm = ({
  handleClosePanel,
  secret,
  permissions,
}: {
  handleClosePanel: (() => void) | undefined;
  secret: SecretKubeObjectInterface | undefined;
  permissions: WidgetPermissions;
}) => {
  const {
    editSecret,
    mutations: { secretEditMutation },
  } = useSecretCRUD({
    onSuccess: handleClosePanel,
  });

  const defaultValues = React.useMemo(() => {
    return {
      [INTEGRATION_SECRET_FORM_NAMES.token.name]: safeDecode(secret?.data?.token),
      [INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(secret?.data?.url),
    };
  }, [secret]);

  const form = useForm<IntegrationSecretFormValues>({
    defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: IntegrationSecretFormValues) => {
      const secretInstance = createSonarQubeIntegrationSecretInstance(values);

      await editSecret({ secretData: secretInstance });
    },
    [editSecret]
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
