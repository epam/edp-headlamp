import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../constants/gitServers';
import { useGitServerListQuery } from '../../../../k8s/EDPGitServer/hooks/useGitServerListQuery';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { RepositoryUrlProps } from './types';

export const RepositoryUrl = ({ names, handleFormFieldChange }: RepositoryUrlProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
    } = useFormContext();

    const fieldRequirementLabel =
        'Specify the application URL in the following format: http(s)://git.sample.com/sample';
    const { data: gitServers } = useGitServerListQuery({});

    const hasGerritGitServer = React.useMemo(() => {
        if (!gitServers) {
            return true;
        }

        return !!gitServers?.items.find(el => el.spec.gitProvider === GIT_SERVERS.GERRIT);
    }, [gitServers]);

    return (
        <FormTextField
            {...register(names.repositoryUrl.name, {
                required: fieldRequirementLabel,
                pattern: {
                    value: /((git|ssh|http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@\/~-]+)\w/,
                    message: fieldRequirementLabel,
                },
                onBlur: ({ target: { name, value } }: FieldEvent) => {
                    handleFormFieldChange({ name, value });

                    if (!value) {
                        return;
                    }

                    const repoName = value.split('/').at(-1).replaceAll('/', '-');
                    const repoNameWithSlashAtTheBeginning = `/${repoName}`;

                    setValue(names.name.name, repoName);
                    handleFormFieldChange({
                        name: names.name.name,
                        value: repoName,
                    });

                    if (hasGerritGitServer) {
                        return;
                    }

                    setValue(names.gitUrlPath.name, repoName);
                    handleFormFieldChange({
                        name: names.gitUrlPath.name,
                        value: repoNameWithSlashAtTheBeginning,
                    });
                },
            })}
            label={'Repository URL'}
            title={fieldRequirementLabel}
            placeholder={'http(s)://git.sample.com/sample'}
            control={control}
            errors={errors}
        />
    );
};
