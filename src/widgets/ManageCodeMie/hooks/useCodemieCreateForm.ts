import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { CodemieKubeObject } from '../../../k8s/groups/EDP/Codemie';
import { CodemieKubeObjectInterface } from '../../../k8s/groups/EDP/Codemie/types';
import { createCodemieInstance } from '../../../k8s/groups/EDP/Codemie/utils/createCodemieInstance';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { CODEMIE_FORM_NAMES } from '../names';
import { CodemieFormValues, WidgetPermissions } from '../types';

export const useCodemieCreateForm = ({
  handleClosePanel,
  permissions,
}: {
  handleClosePanel: () => void;
  permissions: WidgetPermissions;
}): FormItem => {
  const codemieCreateMutation = useResourceCRUDMutation<
    CodemieKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('codemieCreateMutation', CodemieKubeObject, CRUD_TYPES.CREATE);

  const defaultValues = React.useMemo(() => ({ [CODEMIE_FORM_NAMES.name.name]: 'codemie' }), []);

  const form = useForm<CodemieFormValues>({ defaultValues: defaultValues });

  const handleSubmit = React.useCallback(
    async (values: CodemieFormValues) => {
      if (!permissions?.create?.Codemie.allowed) {
        return false;
      }

      const codemieInstance = createCodemieInstance(CODEMIE_FORM_NAMES, values);

      codemieCreateMutation.mutate(codemieInstance, { onSuccess: handleClosePanel });
    },
    [codemieCreateMutation, handleClosePanel, permissions?.create?.Codemie.allowed]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.CREATE,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: codemieCreateMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions?.create?.Codemie.allowed,
        reason: permissions?.create?.Codemie.reason,
      },
    }),
    [
      form,
      handleSubmit,
      codemieCreateMutation.isLoading,
      permissions?.create?.Codemie.allowed,
      permissions?.create?.Codemie.reason,
    ]
  );
};
