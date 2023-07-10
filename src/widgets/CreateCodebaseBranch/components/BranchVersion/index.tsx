import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../components/FormComponents';
import { FieldEvent } from '../../../../types/forms';
import { createReleaseNameString } from '../../../../utils/createReleaseNameString';
import { createVersioningString } from '../../../../utils/createVersioningString';
import { getMajorMinorPatchOfVersion } from '../../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../../utils/getVersionAndPostfixFromVersioningString';
import { BranchVersionProps } from './types';

export const BranchVersion = ({ names }: BranchVersionProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const releaseFieldValue = watch(names.release.name);
    const branchVersionStartFieldValue = watch(names.branchVersionStart.name) || '';
    const branchVersionPostfixFieldValue = watch(names.branchVersionPostfix.name) || '';

    const onBranchVersionStartFieldValueChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            const branchVersion = createVersioningString(value, branchVersionPostfixFieldValue);

            setValue(names.version.name, branchVersion);

            if (!releaseFieldValue) {
                return;
            }

            const { version } = getVersionAndPostfixFromVersioningString(branchVersion);
            const { major, minor } = getMajorMinorPatchOfVersion(version);
            setValue(names.branchName.name, createReleaseNameString(major, minor));
        },
        [branchVersionPostfixFieldValue, names, releaseFieldValue, setValue]
    );

    const onBranchVersionPostfixFieldValueChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            const branchVersion = createVersioningString(branchVersionStartFieldValue, value);
            setValue(names.version.name, branchVersion);
        },
        [branchVersionStartFieldValue, names, setValue]
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormTextField
                    {...register(names.branchVersionStart.name, {
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
                    {...register(names.branchVersionPostfix.name, {
                        onBlur: onBranchVersionPostfixFieldValueChange,
                    })}
                    placeholder={'SNAPSHOT'}
                    defaultValue={'SNAPSHOT'}
                    control={control}
                    errors={errors}
                />
            </Grid>
        </Grid>
    );
};
