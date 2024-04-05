import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { EDPGitServerKubeObject } from '../../../../../k8s/EDPGitServer';
import { useGitServerListQuery } from '../../../../../k8s/EDPGitServer/hooks/useGitServerListQuery';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFromTemplateFormValues } from '../../../types';

export const GitServer = () => {
  const { data: gitServers } = useGitServerListQuery({});
  const gitServersOptions = React.useMemo(
    () =>
      gitServers?.items.map((gitServer) => {
        const connected = gitServer?.status?.connected;

        const [icon, color] = EDPGitServerKubeObject.getStatusIcon(connected);

        return {
          label: gitServer.metadata.name,
          value: gitServer.metadata.name,
          disabled: !gitServer.status?.connected,
          icon: <StatusIcon icon={icon} color={color} width={16} Title={''} />,
        };
      }),
    [gitServers?.items]
  );

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateCodebaseFromTemplateFormValues>();

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
