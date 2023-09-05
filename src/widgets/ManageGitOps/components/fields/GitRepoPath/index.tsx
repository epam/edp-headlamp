import { InputAdornment } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FieldEvent } from '../../../../../types/forms';
import { GIT_OPS_CODEBASE_NAME } from '../../../constants';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { ManageGitOpsDataContext, ManageGitOpsValues } from '../../../types';
// relative path should always start with slash

const slashSymbol = '/';

export const GitRepoPath = () => {
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

    const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitRepoPath.name);

    return (
        <FormTextField
            {...register(CODEBASE_FORM_NAMES.gitRepoPath.name, {
                required: 'Enter relative path to repository.',
                pattern: {
                    value: /^.*$/,
                    message: 'Enter valid relative path to repository',
                },
                onChange: ({ target: { value } }: FieldEvent) => {
                    const isGerrit = gitServerFieldValue === GIT_SERVERS.GERRIT;

                    setValue(
                        CODEBASE_FORM_NAMES.gitUrlPath.name,
                        isGerrit ? `/${GIT_OPS_CODEBASE_NAME}` : `${value}/${GIT_OPS_CODEBASE_NAME}`
                    );
                },
            })}
            label={'Git repo relative path'}
            placeholder={
                'Indicate the repository relative path in the following format project/repository'
            }
            control={control}
            errors={errors}
            InputProps={{
                startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
            }}
            disabled={isReadOnly}
        />
    );
};
