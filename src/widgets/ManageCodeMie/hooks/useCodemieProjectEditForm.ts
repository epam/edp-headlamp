import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../k8s/common/editResource';
import { CodemieProjectKubeObject } from '../../../k8s/groups/EDP/CodemieProject';
import { CodemieProjectKubeObjectInterface } from '../../../k8s/groups/EDP/CodemieProject/types';
import { CODEMIE_PROJECT_FORM_NAMES } from '../names';
import { CodemieProjectFormValues } from '../types';

export const useCodemieProjectEditForm = ({
  handleClosePanel,
  codemieProject,
}: {
  handleClosePanel: () => void;
  codemieProject: CodemieProjectKubeObjectInterface;
}) => {
  const codemieEditMutation = useResourceCRUDMutation<
    CodemieProjectKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('codemieEditMutation', CodemieProjectKubeObject, CRUD_TYPES.EDIT);

  const defaultValues = React.useMemo(() => {
    return {
      [CODEMIE_PROJECT_FORM_NAMES.projectName.name]: codemieProject?.metadata.name,
      [CODEMIE_PROJECT_FORM_NAMES.codemieRefName.name]: codemieProject?.spec.codemieRef.name,
    };
  }, [codemieProject.metadata.name, codemieProject.spec.codemieRef.name]);

  const form = useForm<CodemieProjectFormValues>({ defaultValues: defaultValues });

  const handleSubmit = React.useCallback(
    async (values: CodemieProjectFormValues) => {
      const updatedCodemieProjectInstance = editResource(
        CODEMIE_PROJECT_FORM_NAMES,
        codemieProject?.jsonData,
        values
      );

      codemieEditMutation.mutate(updatedCodemieProjectInstance, { onSuccess: handleClosePanel });
    },
    [codemieProject, codemieEditMutation, handleClosePanel]
  );

  return React.useMemo(
    () => ({ form, mutation: codemieEditMutation, handleSubmit }),
    [form, codemieEditMutation, handleSubmit]
  );
};
