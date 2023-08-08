import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { codebaseVersioningTypeSelectOptions } from '../../../../../configs/select-options/codebaseVersioningTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../constants/codebaseVersioningTypes';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const CodebaseVersioning = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<CreateCodebaseFormValues>();

    const codebaseVersioningTypeFieldValue = watch(CODEBASE_FORM_NAMES.versioningType.name);
    const versioningStartFromVersionFieldValue = watch(
        CODEBASE_FORM_NAMES.versioningStartFromVersion.name
    );
    const versioningStartFromSnapshotFieldValue = watch(
        CODEBASE_FORM_NAMES.versioningStartFromSnapshot.name
    );
    const onStartVersionFromSnapshotStaticFieldChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            setValue(
                CODEBASE_FORM_NAMES.versioningStartFrom.name,
                `${versioningStartFromVersionFieldValue || ''}-${value}`
            );
        },
        [setValue, versioningStartFromVersionFieldValue]
    );

    const onStartVersionFromVersionChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            setValue(
                CODEBASE_FORM_NAMES.versioningStartFrom.name,
                `${value}-${versioningStartFromSnapshotFieldValue || ''}`
            );
        },
        [setValue, versioningStartFromSnapshotFieldValue]
    );

    const handleVersioningTypeChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            if (
                value === CODEBASE_VERSIONING_TYPES.EDP &&
                !versioningStartFromVersionFieldValue &&
                !versioningStartFromSnapshotFieldValue
            ) {
                setValue(CODEBASE_FORM_NAMES.versioningStartFromVersion.name, '0.0.0');
                setValue(CODEBASE_FORM_NAMES.versioningStartFromSnapshot.name, 'SNAPSHOT');
                setValue(CODEBASE_FORM_NAMES.versioningStartFrom.name, '0.0.0-SNAPSHOT');
            }
        },
        [setValue, versioningStartFromSnapshotFieldValue, versioningStartFromVersionFieldValue]
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <FormSelect
                    {...register(CODEBASE_FORM_NAMES.versioningType.name, {
                        required: 'Select codebase versioning type',
                        onChange: handleVersioningTypeChange,
                    })}
                    label={'Codebase versioning type'}
                    placeholder={'Select codebase versioning type'}
                    title={'Define the versioning strategy for source code and artifacts'}
                    control={control}
                    errors={errors}
                    options={codebaseVersioningTypeSelectOptions}
                />
            </Grid>
            {codebaseVersioningTypeFieldValue === CODEBASE_VERSIONING_TYPES.EDP ? (
                <>
                    <Grid item xs={4}>
                        <FormTextField
                            {...register(CODEBASE_FORM_NAMES.versioningStartFromVersion.name, {
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
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            flexDirection: 'column',
                        }}
                    >
                        <FormTextField
                            {...register(CODEBASE_FORM_NAMES.versioningStartFromSnapshot.name, {
                                required: 'Enter start version from',
                                onBlur: onStartVersionFromSnapshotStaticFieldChange,
                            })}
                            placeholder={'SNAPSHOT'}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                </>
            ) : null}
        </Grid>
    );
};
