import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../../hooks/useResourceCRUDMutation';
import { EDPGitServerKubeObject } from '../../../../../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../../../../../k8s/EDPGitServer/types';
import { createGitServerInstance } from '../../../../../../k8s/EDPGitServer/utils/createGitServerInstance';
import { useMultiFormContext } from '../../../../../../providers/MultiForm/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { useDataContext } from '../../../../providers/Data/hooks';
import { GIT_SERVER_FORM_NAMES } from '../../names';
import { GitServerFormValues } from '../../types';
import { Form } from './components/Form';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Create = ({ formRef }: { formRef: React.MutableRefObject<HTMLFormElement> }) => {
  const { handleClosePanel } = useDataContext();
  const baseDefaultValues = useDefaultValues();

  const methods = useForm<GitServerFormValues>({
    defaultValues: baseDefaultValues,
  });

  const gitServerCreateMutation = useResourceCRUDMutation<
    EDPGitServerKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('gitServerCreateMutation', EDPGitServerKubeObject, CRUD_TYPES.CREATE);

  const onSubmit = React.useCallback(
    async (values: GitServerFormValues) => {
      const transformedValues = {
        ...values,
        sshPort: Number(values.sshPort),
        httpsPort: Number(values.httpsPort),
      };
      const gitServerValues = getUsedValues(transformedValues, GIT_SERVER_FORM_NAMES);

      const newGitServer = createGitServerInstance(GIT_SERVER_FORM_NAMES, gitServerValues);
      gitServerCreateMutation.mutate(newGitServer, {
        onSuccess: () => {
          methods.reset();
          handleClosePanel();
        },
      });
    },
    [gitServerCreateMutation, handleClosePanel, methods]
  );

  const { registerForm, unregisterForm } = useMultiFormContext();

  React.useEffect(() => {
    registerForm('gitServerCreate', methods);

    return () => {
      unregisterForm('gitServerCreate', methods);
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
