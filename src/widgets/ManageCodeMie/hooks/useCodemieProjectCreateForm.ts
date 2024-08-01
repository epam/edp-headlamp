import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { CodemieProjectKubeObject } from '../../../k8s/groups/EDP/CodemieProject';
import { CodemieProjectKubeObjectInterface } from '../../../k8s/groups/EDP/CodemieProject/types';
import { createCodemieProjectInstance } from '../../../k8s/groups/EDP/CodemieProject/utils/createCodemieProjectInstance';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { CODEMIE_PROJECT_FORM_NAMES } from '../names';
import { CodemieProjectFormValues } from '../types';

export const useCodemieProjectCreateForm = ({
  handleClosePanel,
}: {
  handleClosePanel: () => void;
}) => {
  const codemieCreateMutation = useResourceCRUDMutation<
    CodemieProjectKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('codemieCreateMutation', CodemieProjectKubeObject, CRUD_TYPES.CREATE);

  const defaultValues = React.useMemo(() => {
    return {
      [CODEMIE_PROJECT_FORM_NAMES.projectName.name]: getDefaultNamespace(),
      [CODEMIE_PROJECT_FORM_NAMES.codemieRefName.name]: 'codemie',
    };
  }, []);

  const form = useForm<CodemieProjectFormValues>({ defaultValues: defaultValues });

  const handleSubmit = React.useCallback(
    async (values: CodemieProjectFormValues) => {
      const codemieInstance = createCodemieProjectInstance(CODEMIE_PROJECT_FORM_NAMES, values);

      codemieCreateMutation.mutate(codemieInstance, { onSuccess: handleClosePanel });
    },
    [codemieCreateMutation, handleClosePanel]
  );

  return React.useMemo(
    () => ({ form, mutation: codemieCreateMutation, handleSubmit }),
    [form, codemieCreateMutation, handleSubmit]
  );
};
