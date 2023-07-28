import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { createVersioningString } from '../../../../../utils/createVersioningString';
import { getVersionAndPostfixFromVersioningString } from '../../../../../utils/getVersionAndPostfixFromVersioningString';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { CreateCodebaseBranchFormValues } from '../../../types';
import { BranchNameProps } from './types';

export const BranchName = ({ defaultBranchVersion }: BranchNameProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<CreateCodebaseBranchFormValues>();

    const releaseFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.release.name);
    const versionStartFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.branchVersionStart.name);

    const handleBranchNameFieldValueChange = React.useCallback(
        ({ target: { value } }: FieldEvent) => {
            if (releaseFieldValue || !defaultBranchVersion) {
                return;
            }

            const { postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);
            const newValue = value === '' ? postfix : `${value}-${postfix}`;

            setValue(CODEBASE_BRANCH_FORM_NAMES.branchVersionPostfix.name, newValue);
            setValue(
                CODEBASE_BRANCH_FORM_NAMES.version.name,
                createVersioningString(versionStartFieldValue, newValue)
            );
        },
        [defaultBranchVersion, releaseFieldValue, setValue, versionStartFieldValue]
    );

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(CODEBASE_BRANCH_FORM_NAMES.branchName.name, {
                    pattern: {
                        value: /^[a-z0-9][a-z0-9\/\-.]*[a-z0-9]$/,
                        message: 'Enter valid branch name',
                    },
                    required: `Branch name may contain only: lower-case letters, numbers, slashes, dashes and dots.
                                Can start and end only with lower-case letters and numbers. Minimum 2 characters.
                            `,
                    onChange: handleBranchNameFieldValueChange,
                })}
                label={'Branch Name'}
                title={'Type the branch name that will be created in the Version Control System.'}
                placeholder={'Enter Branch Name'}
                control={control}
                errors={errors}
                disabled={releaseFieldValue}
            />
        </Grid>
    );
};
