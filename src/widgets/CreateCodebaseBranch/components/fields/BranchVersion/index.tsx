import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { createReleaseNameString } from '../../../../../utils/createReleaseNameString';
import { createVersioningString } from '../../../../../utils/createVersioningString';
import { getMajorMinorPatchOfVersion } from '../../../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../../../utils/getVersionAndPostfixFromVersioningString';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { CreateCodebaseBranchFormValues } from '../../../types';

export const BranchVersion = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<CreateCodebaseBranchFormValues>();

    const releaseFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.release.name);
    const branchVersionStartFieldValue =
        watch(CODEBASE_BRANCH_FORM_NAMES.branchVersionStart.name) || '';
    const branchVersionPostfixFieldValue =
        watch(CODEBASE_BRANCH_FORM_NAMES.branchVersionPostfix.name) || '';

    const onBranchVersionStartFieldValueChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            const branchVersion = createVersioningString(value, branchVersionPostfixFieldValue);

            setValue(CODEBASE_BRANCH_FORM_NAMES.version.name, branchVersion);

            if (!releaseFieldValue) {
                return;
            }

            const { version } = getVersionAndPostfixFromVersioningString(branchVersion);
            const { major, minor } = getMajorMinorPatchOfVersion(version);
            setValue(
                CODEBASE_BRANCH_FORM_NAMES.branchName.name,
                createReleaseNameString(major, minor)
            );
        },
        [branchVersionPostfixFieldValue, releaseFieldValue, setValue]
    );

    const onBranchVersionPostfixFieldValueChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            const branchVersion = createVersioningString(branchVersionStartFieldValue, value);
            setValue(CODEBASE_BRANCH_FORM_NAMES.version.name, branchVersion);
        },
        [branchVersionStartFieldValue, setValue]
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormTextField
                    {...register(CODEBASE_BRANCH_FORM_NAMES.branchVersionStart.name, {
                        required: 'Branch version',
                        onBlur: onBranchVersionStartFieldValueChange,
                        pattern: {
                            value: /^([0-9]+)\.([0-9]+)\.([0-9]+)?$/,
                            message: 'Enter valid semantic versioning format',
                        },
                    })}
                    label={'Branch version'}
                    title={'Valid identifiers are in the set [A-Za-z0-9]'}
                    placeholder={'0.0.0'}
                    defaultValue={'0.0.0'}
                    control={control}
                    errors={errors}
                />
            </Grid>
            <Grid item xs={6}>
                <FormTextField
                    {...register(CODEBASE_BRANCH_FORM_NAMES.branchVersionPostfix.name, {
                        onBlur: onBranchVersionPostfixFieldValueChange,
                    })}
                    placeholder={'SNAPSHOT'}
                    defaultValue={'SNAPSHOT'}
                    control={control}
                    errors={errors}
                    showLabelPlaceholder
                />
            </Grid>
        </Grid>
    );
};
