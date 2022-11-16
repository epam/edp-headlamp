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

    const nameRequirementLabel = `${capitalizedCodebaseType} name may contain only: lower-case letters, numbers and dashes and cannot start and end with dash. Minimum 2 characters.`;

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.name.name, {
                    required: 'Please, enter a codebase name',
                    pattern: {
                        value: /^[a-z][a-z0-9-]*[a-z0-9]$/,
                        message: nameRequirementLabel,
                    },
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({
                            name,
                            value: typeof value === 'string' ? value.trim() : value,
                        }),
                })}
                label={`${capitalizedCodebaseType} Name`}
                title={nameRequirementLabel}
                placeholder={`Type your ${type} name`}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
