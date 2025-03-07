import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPE } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../k8s/common/editResource';
import { CodemieKubeObject } from '../../../k8s/groups/EDP/Codemie';
import { CodemieKubeObjectInterface } from '../../../k8s/groups/EDP/Codemie/types';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { CODEMIE_FORM_NAMES } from '../names';
import { CodemieFormValues, WidgetPermissions } from '../types';

export const useCodemieEditForm = ({
  handleClosePanel,
  codemie,
  permissions,
}: {
  handleClosePanel: () => void;
  codemie: CodemieKubeObjectInterface;
  permissions: WidgetPermissions;
}): FormItem => {
  const codemieEditMutation = useResourceCRUDMutation<CodemieKubeObjectInterface, CRUD_TYPE.EDIT>(
    'codemieEditMutation',
    CodemieKubeObject,
    CRUD_TYPE.EDIT
  );

  const defaultValues = React.useMemo(() => {
    return {
      [CODEMIE_FORM_NAMES.name.name]: codemie?.spec.oidc.secretRef.name,
      [CODEMIE_FORM_NAMES.apiUrl.name]: codemie?.spec.url,
      [CODEMIE_FORM_NAMES.tokenEndpoint.name]: codemie?.spec.oidc.tokenEndpoint,
    };
  }, [codemie?.spec.oidc.secretRef.name, codemie?.spec.oidc.tokenEndpoint, codemie?.spec.url]);

  const form = useForm<CodemieFormValues>({ defaultValues: defaultValues });

  const handleSubmit = React.useCallback(
    async (values: CodemieFormValues) => {
      if (!permissions?.update?.Codemie.allowed) {
        return false;
      }

      const updatedCodemieInstance = editResource(CODEMIE_FORM_NAMES, codemie?.jsonData, values);

      codemieEditMutation.mutate(updatedCodemieInstance, { onSuccess: handleClosePanel });
    },
    [codemie?.jsonData, codemieEditMutation, handleClosePanel, permissions?.update?.Codemie.allowed]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.EDIT,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: codemieEditMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions?.update?.Codemie.allowed,
        reason: permissions?.update?.Codemie.reason,
      },
    }),
    [
      form,
      handleSubmit,
      codemieEditMutation.isLoading,
      permissions?.update?.Codemie.allowed,
      permissions?.update?.Codemie.reason,
    ]
  );
};
