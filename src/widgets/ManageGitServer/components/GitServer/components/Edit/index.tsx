import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../../../../k8s/common/editResource';
import { EDPGitServerKubeObject } from '../../../../../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../../../../../k8s/EDPGitServer/types';
import { useMultiFormContext } from '../../../../../../providers/MultiForm/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { useDataContext } from '../../../../providers/Data/hooks';
import { GIT_SERVER_FORM_NAMES } from '../../names';
import { GitServerFormValues } from '../../types';
import { Form } from './components/Form';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Edit = ({ formRef }: { formRef: React.MutableRefObject<HTMLFormElement> }) => {
  const { gitServer } = useDataContext();
  const baseDefaultValues = useDefaultValues();

  const methods = useForm<GitServerFormValues>({
    defaultValues: baseDefaultValues,
  });

  const gitServerEditMutation = useResourceCRUDMutation<
    EDPGitServerKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('gitServerEditMutation', EDPGitServerKubeObject, CRUD_TYPES.EDIT);

  const onSubmit = React.useCallback(
    async (values: GitServerFormValues) => {
      const transformedValues = {
        ...values,
        sshPort: Number(values.sshPort),
        httpsPort: Number(values.httpsPort),
      };
      const gitServerValues = getUsedValues(transformedValues, GIT_SERVER_FORM_NAMES);

      const newGitServer = editResource(GIT_SERVER_FORM_NAMES, gitServer, gitServerValues);
      gitServerEditMutation.mutate(newGitServer);
    },
    [gitServer, gitServerEditMutation]
  );

  const { registerForm, unregisterForm } = useMultiFormContext();

  React.useEffect(() => {
    registerForm('gitServerEdit', methods);

    return () => {
      unregisterForm('gitServerEdit', methods);
    };
  }, [methods, registerForm, unregisterForm]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
        <Form />
      </form>
    </FormProvider>
  );
};
