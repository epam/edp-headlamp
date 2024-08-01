import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { CodemieKubeObject } from '../../../k8s/groups/EDP/Codemie';
import { CodemieKubeObjectInterface } from '../../../k8s/groups/EDP/Codemie/types';
import { createCodemieInstance } from '../../../k8s/groups/EDP/Codemie/utils/createCodemieInstance';
import { CODEMIE_FORM_NAMES } from '../names';
import { CodemieFormValues } from '../types';

export const useCodemieCreateForm = ({ handleClosePanel }: { handleClosePanel: () => void }) => {
  const codemieCreateMutation = useResourceCRUDMutation<
    CodemieKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('codemieCreateMutation', CodemieKubeObject, CRUD_TYPES.CREATE);

  const defaultValues = React.useMemo(() => ({ [CODEMIE_FORM_NAMES.name.name]: 'codemie' }), []);

  const form = useForm<CodemieFormValues>({ defaultValues: defaultValues });

  const handleSubmit = React.useCallback(
    async (values: CodemieFormValues) => {
      const codemieInstance = createCodemieInstance(CODEMIE_FORM_NAMES, values);

      codemieCreateMutation.mutate(codemieInstance, { onSuccess: handleClosePanel });
    },
    [codemieCreateMutation, handleClosePanel]
  );

  return React.useMemo(
    () => ({ form, mutation: codemieCreateMutation, handleSubmit }),
    [form, codemieCreateMutation, handleSubmit]
  );
};
