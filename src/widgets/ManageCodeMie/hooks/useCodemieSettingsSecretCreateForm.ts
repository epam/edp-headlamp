import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { CodemieProjectKubeObjectInterface } from '../../../k8s/groups/EDP/CodemieProject/types';
import { createCodemieProjectSettingsSecretInstance } from '../../../k8s/groups/EDP/CodemieProjectSettings/utils/createCodemieProjectSettingsSecretInstance';
import { CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES } from '../names';
import { CodemieProjectSettingsSecretFormValues } from '../types';

export const useCodemieSettingsSecretCreateForm = ({
  handleClosePanel,
  codemieProject,
}: {
  handleClosePanel: () => void;
  codemieProject: CodemieProjectKubeObjectInterface;
}) => {
  const {
    createSecret,
    mutations: { secretCreateMutation },
  } = useSecretCRUD({
    onSuccess: handleClosePanel,
  });

  const defaultValues = React.useMemo(() => {
    return {
      [CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES.projectName.name]: codemieProject?.metadata?.name,
    };
  }, [codemieProject?.metadata?.name]);

  const form = useForm<CodemieProjectSettingsSecretFormValues>({ defaultValues: defaultValues });

  const handleSubmit = React.useCallback(
    async (values: CodemieProjectSettingsSecretFormValues) => {
      const secretInstance = createCodemieProjectSettingsSecretInstance(
        CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES,
        values
      );

      await createSecret({ secretData: secretInstance as SecretKubeObjectInterface });
    },
    [createSecret]
  );

  return React.useMemo(
    () => ({ form, mutation: secretCreateMutation, handleSubmit }),
    [form, secretCreateMutation, handleSubmit]
  );
};
