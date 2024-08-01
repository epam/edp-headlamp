import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { createChatAssistantIntegrationSecretInstance } from '../../../k8s/groups/default/Secret/utils/createChatAssistantIntegrationSecretInstance';
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
      [INTEGRATION_SECRET_FORM_NAMES.apiUrl.name]: safeDecode(secret?.data?.apiUrl),
      [INTEGRATION_SECRET_FORM_NAMES.assistantId.name]: safeDecode(secret?.data?.assistantId),
      [INTEGRATION_SECRET_FORM_NAMES.token.name]: safeDecode(secret?.data?.token),
    };
  }, [secret]);

  const form = useForm<IntegrationSecretFormValues>({
    defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: IntegrationSecretFormValues) => {
      const secretInstance = createChatAssistantIntegrationSecretInstance(values);

      await editSecret({ secretData: secretInstance });
    },
    [editSecret]
  );

  return React.useMemo(
    () => ({ form, mutation: secretEditMutation, handleSubmit }),
    [form, secretEditMutation, handleSubmit]
  );
};
