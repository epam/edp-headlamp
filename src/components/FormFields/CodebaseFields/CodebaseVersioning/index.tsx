import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { codebaseVersioningTypeSelectOptions } from '../../../../configs/select-options/codebaseVersioningTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { FormTextField } from '../../../FormComponents';
import { CodebaseVersioningProps } from './types';

export const CodebaseVersioning = ({ names, handleFormFieldChange }: CodebaseVersioningProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const codebaseVersioningTypeFieldValue = watch(names.versioningType.name);
    const versioningStartFromVersionFieldValue = watch(names.versioningStartFromVersion.name);
    const versioningStartFromSnapshotFieldValue = watch(names.versioningStartFromSnapshot.name);
    const onStartVersionFromSnapshotStaticFieldChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            handleFormFieldChange({
                name: names.versioningStartFrom.name,
                value: `${versioningStartFromVersionFieldValue || ''}-${value}`,
            });
        },
        [
            handleFormFieldChange,
            names.versioningStartFrom.name,
            versioningStartFromVersionFieldValue,
        ]
    );

    const onStartVersionFromVersionChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            handleFormFieldChange({
                name: names.versioningStartFrom.name,
                value: `${value}-${versioningStartFromSnapshotFieldValue || ''}`,
            });
        },
        [
            handleFormFieldChange,
            names.versioningStartFrom.name,
            versioningStartFromSnapshotFieldValue,
        ]
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormSelect
                    {...register(names.versioningType.name, {
                        required: 'Select codebase versioning type',
                        onBlur: ({ target: { name, value } }: FieldEvent) =>
                            handleFormFieldChange({ name, value }),
                    })}
                    label={'Codebase versioning type'}
                    placeholder={'Select codebase versioning type'}
                    title={'Define the versioning strategy for source code and artifacts'}
                    control={control}
                    errors={errors}
                    options={codebaseVersioningTypeSelectOptions}
                />
            </Grid>
            {codebaseVersioningTypeFieldValue === CODEBASE_VERSIONING_TYPES['EDP'] ? (
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormTextField
                                {...register(names.versioningStartFromVersion.name, {
                                    required: 'Enter start version from',
                                    onBlur: onStartVersionFromVersionChange,
                                    pattern: {
                                        value: /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/,
                                        message: 'Enter valid semantic versioning format',
                                    },
                                })}
                                label={'Start version from'}
                                title={'Valid identifiers are in the set [A-Za-z0-9]'}
                                placeholder={'0.0.0'}
                                defaultValue={'0.0.0'}
                                control={control}
                                errors={errors}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                flexDirection: 'column',
                            }}
                        >
                            <FormTextField
                                {...register(names.versioningStartFromSnapshot.name, {
                                    required: 'Enter start version from',
                                    onBlur: onStartVersionFromSnapshotStaticFieldChange,
                                })}
                                placeholder={'SNAPSHOT'}
                                defaultValue={'SNAPSHOT'}
                                control={control}
                                errors={errors}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            ) : null}
        </Grid>
    );
};
