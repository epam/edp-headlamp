import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/Secret/hooks/useSecretCRUD';
import { createDefectDojoIntegrationSecretInstance } from '../../../k8s/Secret/utils/createDefectDojoIntegrationSecretInstance';
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
      const secretInstance = createDefectDojoIntegrationSecretInstance(values);

      await createSecret({ secretData: secretInstance });
    },
    [createSecret]
  );

  return React.useMemo(
    () => ({ form, mutation: secretCreateMutation, handleSubmit }),
    [form, secretCreateMutation, handleSubmit]
  );
};
