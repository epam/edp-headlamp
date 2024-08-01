import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { CodemieProjectKubeObjectInterface } from '../../../k8s/groups/EDP/CodemieProject/types';
import { createCodemieProjectSettingsSecretInstance } from '../../../k8s/groups/EDP/CodemieProjectSettings/utils/createCodemieProjectSettingsSecretInstance';
import { safeDecode } from '../../../utils/decodeEncode';
import { CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES } from '../names';
import { CodemieProjectSettingsSecretFormValues } from '../types';

export const useCodemieSettingsSecretEditForm = ({
  handleClosePanel,
  secret,
  codemieProject,
}: {
  handleClosePanel: () => void;
  secret: SecretKubeObjectInterface;
  codemieProject: CodemieProjectKubeObjectInterface;
}) => {
  const {
    editSecret,
    mutations: { secretEditMutation },
  } = useSecretCRUD({
    onSuccess: handleClosePanel,
  });

  const defaultValues = React.useMemo(() => {
    return {
      [CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES.projectName.name]: codemieProject?.metadata?.name,
      [CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES.token.name]: safeDecode(secret?.data?.token),
    };
  }, [codemieProject?.metadata?.name, secret?.data?.token]);

  const form = useForm<CodemieProjectSettingsSecretFormValues>({
    defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: CodemieProjectSettingsSecretFormValues) => {
      const secretInstance = createCodemieProjectSettingsSecretInstance(
        CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES,
        values
      );

      await editSecret({ secretData: secretInstance as SecretKubeObjectInterface });
    },
    [editSecret]
  );

  return React.useMemo(
    () => ({ form, mutation: secretEditMutation, handleSubmit }),
    [form, secretEditMutation, handleSubmit]
  );
};
