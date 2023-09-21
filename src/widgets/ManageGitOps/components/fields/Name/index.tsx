import { InputAdornment } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { ManageGitOpsValues } from '../../../types';

const slashSymbol = '/';

export const Name = () => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useReactHookFormContext<ManageGitOpsValues>();

    const gitRepoPathFieldValue = watch(CODEBASE_FORM_NAMES.gitRepoPath.name);
    const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

    return (
        <FormTextField
            {...register(CODEBASE_FORM_NAMES.name.name, {
                onChange: ({ target: { value } }: FieldEvent) => {
                    const isGerrit = gitServerFieldValue === GIT_SERVERS.GERRIT;

                    setValue(
                        CODEBASE_FORM_NAMES.gitUrlPath.name,
                        isGerrit ? `/${value}` : `${gitRepoPathFieldValue}/${value}`
                    );
                },
            })}
            label={'Repository Name'}
            control={control}
            errors={errors}
            InputProps={{
                startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
            }}
            disabled
        />
    );
};
