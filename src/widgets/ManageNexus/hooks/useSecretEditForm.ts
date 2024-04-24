import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import { createNexusIntegrationSecretInstance } from '../../../k8s/Secret/utils/createNexusIntegrationSecretInstance';
import { safeDecode } from '../../../utils/decodeEncode';
import { INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { IntegrationSecretFormValues } from '../types';

export const useSecretEditForm = ({
  handleClosePanel,
  secret,
}: {
  handleClosePanel: () => void;
  secret: SecretKubeObjectInterface;
}) => {
  const {
    editSecret,
    mutations: { secretEditMutation },
  } = useSecretCRUD({
    onSuccess: handleClosePanel,
  });

  const defaultValues = React.useMemo(() => {
    return {
      [INTEGRATION_SECRET_FORM_NAMES.username.name]: safeDecode(secret?.data?.username),
      [INTEGRATION_SECRET_FORM_NAMES.password.name]: safeDecode(secret?.data?.password),
      [INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(secret?.data?.url),
    };
  }, [secret]);

  const form = useForm<IntegrationSecretFormValues>({
    defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: IntegrationSecretFormValues) => {
      const secretInstance = createNexusIntegrationSecretInstance(values);

      await editSecret({ secretData: secretInstance });
    },
    [editSecret]
  );

  return React.useMemo(
    () => ({ form, mutation: secretEditMutation, handleSubmit }),
    [form, secretEditMutation, handleSubmit]
  );
};
