import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { codebaseVersioningTypeSelectOptions } from '../../../../../configs/select-options/codebaseVersioningTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../constants/codebaseVersioningTypes';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFromTemplateFormValues } from '../../../types';

export const CodebaseVersioning = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<CreateCodebaseFromTemplateFormValues>();

    const codebaseVersioningTypeFieldValue = watch(
        CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningType.name
    );
    const versioningStartFromVersionFieldValue = watch(
        CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromVersion.name
    );
    const versioningStartFromSnapshotFieldValue = watch(
        CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromPostfix.name
    );
    const onStartVersionFromSnapshotStaticFieldChange = ({ target: { value } }: FieldEvent) => {
        setValue(
            CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFrom.name,
            `${versioningStartFromVersionFieldValue || ''}-${value}`
        );
    };

    const onStartVersionFromVersionChange = ({ target: { value } }: FieldEvent) => {
        setValue(
            CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFrom.name,
            `${value}-${versioningStartFromSnapshotFieldValue || ''}`
        );
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <FormSelect
                    {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningType.name, {
                        required: 'Select codebase versioning type',
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
                            {...register(
                                CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromVersion.name,
                                {
                                    required: 'Enter start version from',
                                    onBlur: onStartVersionFromVersionChange,
                                    pattern: {
                                        value: /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/,
                                        message: 'Enter valid semantic versioning format',
                                    },
                                }
                            )}
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
                            {...register(
                                CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromPostfix.name,
                                {
                                    required: 'Enter start version from',
                                    onBlur: onStartVersionFromSnapshotStaticFieldChange,
                                }
                            )}
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
