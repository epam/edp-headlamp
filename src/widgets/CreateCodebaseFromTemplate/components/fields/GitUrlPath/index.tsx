import { InputAdornment } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFromTemplateFormValues } from '../../../types';

const slashSymbol = '/';

export const GitUrlPath = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext<CreateCodebaseFromTemplateFormValues>();

    const gitServerFieldValue = watch(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitServer.name);

    const title =
        gitServerFieldValue === GIT_SERVERS.GITLAB
            ? 'Specify the codebase repository name in the following format: username/repository_name.'
            : 'Specify the codebase repository name.';

    return (
        <FormTextField
            {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitUrlPath.name, {
                required: 'Enter relative path to repository.',
                pattern: {
                    value: /^.*$/,
                    message: 'Enter valid relative path to repository',
                },
            })}
            label={'Repository name'}
            title={title}
            placeholder={
                'Indicate the repository relative path in the following format project/repository'
            }
            control={control}
            errors={errors}
            InputProps={{
                startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
            }}
        />
    );
};
