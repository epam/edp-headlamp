import { useFormContext } from 'react-hook-form';
import { codebaseVersioningTypeSelectOptions } from '../../../../configs/select-options/codebaseVersioningTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { CodebaseVersioningProps } from './types';

const { Grid } = MuiCore;

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
        <>
            <Grid item xs={12}>
                <FormSelect
                    {...register(names.versioningType.name, {
                        required:
                            'Select codebase versioning type which will be used to handle codebase versioning flow.',
                        onBlur: ({ target: { name, value } }: FieldEvent) =>
                            handleFormFieldChange({ name, value }),
                    })}
                    label={'Codebase Versioning Type'}
                    placeholder={'Select codebase Versioning Type'}
                    title={
                        'Select codebase versioning type which will be used to handle codebase versioning flow.'
                    }
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
                                    required: 'Start Version From',
                                    onBlur: onStartVersionFromVersionChange,
                                })}
                                label={'Start Version From'}
                                title={
                                    'Version may contain only: numbers and dashes and cannot start and end with dash.'
                                }
                                placeholder={'0.0.0'}
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
                                    required: 'Start Version From',
                                    onBlur: onStartVersionFromSnapshotStaticFieldChange,
                                })}
                                placeholder={'SNAPSHOT'}
                                control={control}
                                errors={errors}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            ) : null}
        </>
    );
};
