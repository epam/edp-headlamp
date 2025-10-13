import React from 'react';
import { CI_TOOL } from '../../../../../../constants/ciTools';
import { useGitServerListQuery } from '../../../../../../k8s/groups/EDP/GitServer/hooks/useGitServerListQuery';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';

export const CiTool = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useTypedFormContext();
  const { data: gitServers } = useGitServerListQuery();

  const gitServerFieldValue = watch(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitServer.name);
  const selectedGitServer = gitServers?.items.find(
    (gitServer) => gitServer.metadata.name === gitServerFieldValue
  );

  const isGitlabProvider = selectedGitServer?.spec.gitProvider === 'gitlab';

  const ciToolOptions = [
    { label: 'Tekton', value: CI_TOOL.TEKTON },
    ...(isGitlabProvider ? [{ label: 'GitLab CI', value: CI_TOOL.GITLAB }] : []),
  ];

  return (
    <FormSelect
      {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.ciTool.name)}
      label="CI Pipelines"
      control={control}
      errors={errors}
      options={ciToolOptions}
      disabled={!isGitlabProvider}
    />
  );
};