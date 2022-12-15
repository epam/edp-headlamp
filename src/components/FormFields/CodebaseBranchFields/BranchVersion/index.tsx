import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { createReleaseNameString } from '../../../../utils/createReleaseNameString';
import { createVersioningString } from '../../../../utils/createVersioningString';
import { getMajorMinorPatchOfVersion } from '../../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../../utils/getVersionAndPostfixFromVersioningString';
import { FormTextField } from '../../../FormComponents';
import { BranchVersionProps } from './types';

const { Grid } = MuiCore;

export const BranchVersion = ({ names, handleFormFieldChange }: BranchVersionProps) => {
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

            handleFormFieldChange({
                name: names.branchVersionStart.name,
                value: value,
            });

            handleFormFieldChange({
                name: names.version.name,
                value: branchVersion,
            });

            setValue(names.version.name, branchVersion);

            if (!releaseFieldValue) {
                return;
            }

            const { version } = getVersionAndPostfixFromVersioningString(branchVersion);
            const { major, minor } = getMajorMinorPatchOfVersion(version);
            setValue(names.branchName.name, createReleaseNameString(major, minor));
        },
        [branchVersionPostfixFieldValue, handleFormFieldChange, names, releaseFieldValue, setValue]
    );

    const onBranchVersionPostfixFieldValueChange = React.useCallback(
        ({ target: { value } }: FieldEvent): void => {
            const branchVersion = createVersioningString(branchVersionStartFieldValue, value);
            handleFormFieldChange({
                name: names.branchVersionPostfix.name,
                value: value,
            });

            handleFormFieldChange({
                name: names.version.name,
                value: branchVersion,
            });

            setValue(names.version.name, branchVersion);
        },
        [branchVersionStartFieldValue, handleFormFieldChange, names, setValue]
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormTextField
                    {...register(names.branchVersionStart.name, {
                        required: 'Branch version',
                        onBlur: onBranchVersionStartFieldValueChange,
                        pattern: {
                            value: /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/,
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
                    {...register(names.branchVersionPostfix.name, {
                        required: 'Branch version',
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
