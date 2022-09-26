import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { NameProps } from './types';

const { Grid } = MuiCore;

export const Name = ({ names, handleFormFieldChange, type }: NameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const capitalizedCodebaseType = capitalizeFirstLetter(type);

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.name.name, {
                    required: `${capitalizedCodebaseType} name may contain only: lower-case letters, numbers and dashes and cannot start and end with dash. Minimum 2 characters.`,
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={`${capitalizedCodebaseType} Name`}
                title={`${capitalizedCodebaseType} name may contain only: lower-case letters, numbers and dashes and cannot start and end with dash. Minimum 2 characters.`}
                placeholder={`Type your ${type} name`}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
