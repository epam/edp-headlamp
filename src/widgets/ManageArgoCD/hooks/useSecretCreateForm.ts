import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { createArgoCDIntegrationSecretInstance } from '../../../k8s/groups/default/Secret/utils/createArgoCDIntegrationSecretInstance';
import { IntegrationSecretFormValues } from '../types';

export const useSecretCreateForm = ({ handleClosePanel }: { handleClosePanel: () => void }) => {
  const {
    createSecret,
    mutations: { secretCreateMutation },
  } = useSecretCRUD({
    onSuccess: handleClosePanel,
  });

  const form = useForm<IntegrationSecretFormValues>();

  const handleSubmit = React.useCallback(
    async (values: IntegrationSecretFormValues) => {
      const secretInstance = createArgoCDIntegrationSecretInstance(values);

      await createSecret({ secretData: secretInstance });
    },
    [createSecret]
  );

  return React.useMemo(
    () => ({ form, mutation: secretCreateMutation, handleSubmit }),
    [form, secretCreateMutation, handleSubmit]
  );
};
