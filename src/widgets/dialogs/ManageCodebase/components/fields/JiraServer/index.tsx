import React from 'react';
import { useJiraServerNameListQuery } from '../../../../../../k8s/groups/EDP/JiraServer/hooks/useJiraServerNameListQuery';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const JiraServer = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  const namespace = getDefaultNamespace();
  const { data: jiraServersNames } = useJiraServerNameListQuery();

  return (
    <FormSelect
      {...register(CODEBASE_FORM_NAMES.jiraServer.name, {
        required: 'Select Jira server that will be integrated with the codebase.',
      })}
      label={'Jira server'}
      title={'Select the Jira server to link your component with relevant project tasks.'}
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
