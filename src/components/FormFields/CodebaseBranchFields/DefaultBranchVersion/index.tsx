import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { DefaultBranchVersionProps } from './types';

const { Grid } = MuiCore;

export const DefaultBranchVersion = ({
    names,
    handleFormFieldChange,
}: DefaultBranchVersionProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormTextField
                    {...register(names.defaultBranchVersionStart.name, {
                        required: 'Default branch version',
                        onBlur: ({ target: { name, value } }: FieldEvent) =>
                            handleFormFieldChange({ name, value }),
                        pattern: {
                            value: /^([0-9]+)\.([0-9]+)\.([0-9]+)?$/,
                            message: 'Enter valid semantic versioning format',
                        },
                    })}
                    label={'Default branch version'}
                    title={'Enter the necessary branch version for the artifact.'}
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
                    {...register(names.defaultBranchVersionPostfix.name, {
                        required: 'Default branch version',
                        onBlur: ({ target: { name, value } }: FieldEvent) =>
                            handleFormFieldChange({ name, value }),
                    })}
                    placeholder={'SNAPSHOT'}
                    control={control}
                    errors={errors}
                />
            </Grid>
        </Grid>
    );
};
