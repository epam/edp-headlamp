import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { useGitServerListQuery } from '../../../../../k8s/EDPGitServer/hooks/useGitServerListQuery';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FieldEvent } from '../../../../../types/forms';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { ManageGitOpsDataContext, ManageGitOpsValues } from '../../../types';

export const GitServer = () => {
    const { data: gitServers } = useGitServerListQuery({});
    const gitServersOptions = React.useMemo(
        () => gitServers?.items.map(({ metadata: { name } }) => ({ label: name, value: name })),
        [gitServers?.items]
    );

    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue,
    } = useReactHookFormContext<ManageGitOpsValues>();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageGitOpsDataContext>();

    const gitRepoPathFieldValue = watch(CODEBASE_FORM_NAMES.gitRepoPath.name);
    const nameFieldValue = watch(CODEBASE_FORM_NAMES.name.name);

    return (
        <FormSelect
            {...register(CODEBASE_FORM_NAMES.gitServer.name, {
                required: 'Select an existing Git server',
                onChange: ({ target: { value } }: FieldEvent) => {
                    const isGerrit = value === GIT_SERVERS.GERRIT;

                    setValue(
                        CODEBASE_FORM_NAMES.gitUrlPath.name,
                        isGerrit
                            ? `/${nameFieldValue}`
                            : `${gitRepoPathFieldValue}/${nameFieldValue}`
                    );
                },
            })}
            label={'Git server'}
            title={'Select an existing Git server'}
            control={control}
            errors={errors}
            options={gitServersOptions}
            disabled={isReadOnly}
        />
    );
};
