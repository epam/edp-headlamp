import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../k8s/common/editResource';
import { CodemieProjectSettingsKubeObject } from '../../../k8s/groups/EDP/CodemieProjectSettings';
import { CodemieProjectSettingsKubeObjectInterface } from '../../../k8s/groups/EDP/CodemieProjectSettings/types';
import { CODEMIE_PROJECT_SETTINGS_FORM_NAMES } from '../names';
import { CodemieProjectSettingsFormValues } from '../types';

export const useCodemieProjectSettingsEditForm = ({
  handleClosePanel,
  codemieProjectSettings,
}: {
  handleClosePanel: () => void;
  codemieProjectSettings: CodemieProjectSettingsKubeObjectInterface;
}) => {
  const codemieEditMutation = useResourceCRUDMutation<
    CodemieProjectSettingsKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('codemieEditMutation', CodemieProjectSettingsKubeObject, CRUD_TYPES.EDIT);

  const defaultValues = React.useMemo(() => {
    return {
      [CODEMIE_PROJECT_SETTINGS_FORM_NAMES.alias.name]: codemieProjectSettings?.spec.alias,
      [CODEMIE_PROJECT_SETTINGS_FORM_NAMES.codemieRefName.name]:
        codemieProjectSettings?.spec.codemieRef.name,
      [CODEMIE_PROJECT_SETTINGS_FORM_NAMES.projectName.name]:
        codemieProjectSettings?.spec.projectName,
      [CODEMIE_PROJECT_SETTINGS_FORM_NAMES.type.name]: codemieProjectSettings?.spec.type,
      [CODEMIE_PROJECT_SETTINGS_FORM_NAMES.tokenName.name]:
        codemieProjectSettings?.spec.gitCredential.tokenName,
      [CODEMIE_PROJECT_SETTINGS_FORM_NAMES.url.name]:
        codemieProjectSettings?.spec.gitCredential.url,
    };
  }, [
    codemieProjectSettings?.spec.alias,
    codemieProjectSettings?.spec.codemieRef.name,
    codemieProjectSettings?.spec.gitCredential.tokenName,
    codemieProjectSettings?.spec.gitCredential.url,
    codemieProjectSettings?.spec.projectName,
    codemieProjectSettings?.spec.type,
  ]);

  const form = useForm<CodemieProjectSettingsFormValues>({ defaultValues: defaultValues });

  const handleSubmit = React.useCallback(
    async (values: CodemieProjectSettingsFormValues) => {
      const updatedCodemieProjectSettingsInstance = editResource(
        CODEMIE_PROJECT_SETTINGS_FORM_NAMES,
        codemieProjectSettings?.jsonData,
        values
      );

      codemieEditMutation.mutate(updatedCodemieProjectSettingsInstance, {
        onSuccess: handleClosePanel,
      });
    },
    [codemieProjectSettings, codemieEditMutation, handleClosePanel]
  );

  return React.useMemo(
    () => ({ form, mutation: codemieEditMutation, handleSubmit }),
    [form, codemieEditMutation, handleSubmit]
  );
};
