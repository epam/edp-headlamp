import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { createJiraIntegrationSecretInstance } from '../../../k8s/groups/default/Secret/utils/createJiraIntegrationSecretInstance';
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
    };
  }, [secret]);

  const form = useForm<IntegrationSecretFormValues>({
    defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: IntegrationSecretFormValues) => {
      const { username, password } = values;

      const secretInstance = createJiraIntegrationSecretInstance({
        username,
        password,
      });

      await editSecret({ secretData: secretInstance });
    },
    [editSecret]
  );

  return React.useMemo(
    () => ({ form, mutation: secretEditMutation, handleSubmit }),
    [form, secretEditMutation, handleSubmit]
  );
};
