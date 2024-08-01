import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { CodemieProjectSettingsKubeObject } from '../../../k8s/groups/EDP/CodemieProjectSettings';
import { CodemieProjectSettingsKubeObjectInterface } from '../../../k8s/groups/EDP/CodemieProjectSettings/types';
import { createCodemieProjectSettingsInstance } from '../../../k8s/groups/EDP/CodemieProjectSettings/utils/createCodemieProjectSettingsInstance';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { CODEMIE_PROJECT_SETTINGS_FORM_NAMES } from '../names';
import { CodemieProjectSettingsFormValues } from '../types';

export const useCodemieProjectSettingsCreateForm = ({
  handleClosePanel,
}: {
  handleClosePanel: () => void;
}) => {
  const codemieCreateMutation = useResourceCRUDMutation<
    CodemieProjectSettingsKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('codemieCreateMutation', CodemieProjectSettingsKubeObject, CRUD_TYPES.CREATE);

  const defaultValues = React.useMemo(() => {
    return {
      [CODEMIE_PROJECT_SETTINGS_FORM_NAMES.projectName.name]: getDefaultNamespace(),
      [CODEMIE_PROJECT_SETTINGS_FORM_NAMES.codemieRefName.name]: 'codemie',
    };
  }, []);

  const form = useForm<CodemieProjectSettingsFormValues>({
    defaultValues: defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: CodemieProjectSettingsFormValues) => {
      const codemieInstance = createCodemieProjectSettingsInstance(
        CODEMIE_PROJECT_SETTINGS_FORM_NAMES,
        values
      );

      codemieCreateMutation.mutate(codemieInstance, { onSuccess: handleClosePanel });
    },
    [codemieCreateMutation, handleClosePanel]
  );

  return React.useMemo(
    () => ({ form, mutation: codemieCreateMutation, handleSubmit }),
    [form, codemieCreateMutation, handleSubmit]
  );
};
