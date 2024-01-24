import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useJiraServerNameListQuery } from '../../../../../k8s/JiraServer/hooks/useJiraServerNameListQuery';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const JiraServer = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateCodebaseFormValues>();

  const namespace = getDefaultNamespace();
  const { data: jiraServersNames } = useJiraServerNameListQuery();

  return (
    <FormSelect
      {...register(CODEBASE_FORM_NAMES.jiraServer.name, {
        required: 'Select Jira server that will be integrated with the codebase.',
      })}
      label={'Jira server'}
      title={'Select the Jira server to link your component with relevant project tasks.'}
      placeholder={!namespace ? 'Select namespace first' : 'Select Jira server'}
      control={control}
      errors={errors}
      disabled={!namespace}
      options={jiraServersNames.map((el) => ({
        label: el,
        value: el,
      }))}
    />
  );
};
