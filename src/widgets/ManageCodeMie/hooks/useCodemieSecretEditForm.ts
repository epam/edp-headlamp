import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { createCodemieSecretInstance } from '../../../k8s/groups/EDP/Codemie/utils/createCodemieSecretInstance';
import { safeDecode } from '../../../utils/decodeEncode';
import { CODEMIE_SECRET_FORM_NAMES } from '../names';
import { CodemieSecretFormValues } from '../types';

export const useCodemieSecretEditForm = ({
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
      const secretInstance = createCodemieSecretInstance(CODEMIE_SECRET_FORM_NAMES, values);

      await editSecret({ secretData: secretInstance as SecretKubeObjectInterface });
    },
    [editSecret]
  );

  return React.useMemo(
    () => ({ form, mutation: secretEditMutation, handleSubmit }),
    [form, secretEditMutation, handleSubmit]
  );
};
