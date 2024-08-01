import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { createCodemieSecretInstance } from '../../../k8s/groups/EDP/Codemie/utils/createCodemieSecretInstance';
import { CODEMIE_SECRET_FORM_NAMES } from '../names';
import { CodemieSecretFormValues } from '../types';

export const useCodemieSecretCreateForm = ({
  handleClosePanel,
}: {
  handleClosePanel: () => void;
}) => {
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
      const secretInstance = createCodemieSecretInstance(CODEMIE_SECRET_FORM_NAMES, values);

      await createSecret({ secretData: secretInstance as SecretKubeObjectInterface });
    },
    [createSecret]
  );

  return React.useMemo(
    () => ({ form, mutation: secretCreateMutation, handleSubmit }),
    [form, secretCreateMutation, handleSubmit]
  );
};
