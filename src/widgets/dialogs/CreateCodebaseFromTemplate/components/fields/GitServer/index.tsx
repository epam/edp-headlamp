import React from 'react';
import { StatusIcon } from '../../../../../../components/StatusIcon';
import { GitServerKubeObject } from '../../../../../../k8s/groups/EDP/GitServer';
import { useGitServerListQuery } from '../../../../../../k8s/groups/EDP/GitServer/hooks/useGitServerListQuery';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';

export const GitServer = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  const { data: gitServers } = useGitServerListQuery({});
  const gitServersOptions = React.useMemo(
    () =>
      gitServers?.items.map((gitServer) => {
        const connected = gitServer?.status?.connected;

        const [icon, color] = GitServerKubeObject.getStatusIcon(connected);

        return {
          label: gitServer.metadata.name,
          value: gitServer.metadata.name,
          disabled: !gitServer.status?.connected,
          icon: <StatusIcon icon={icon} color={color} width={16} Title={''} />,
        };
      }),
    [gitServers?.items]
  );

  return (
    <FormSelect
      {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitServer.name, {
        required: 'Select an existing Git server.',
      })}
      label={'Git server'}
      title={'Choose the Git server for hosting your repository.'}
      control={control}
      errors={errors}
      options={gitServersOptions}
    />
  );
};
