import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { FormTextField } from '../../../FormComponents';
import { NameProps } from './types';

export const Name = ({ names, handleFormFieldChange }: NameProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const typeFieldValue = watch(names.type.name);

    const capitalizedCodebaseType = capitalizeFirstLetter(typeFieldValue);

    const nameRequirementLabel = `${capitalizedCodebaseType} name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, and cannot have whitespaces`;

    return (
        <FormTextField
            {...register(names.name.name, {
                required: `Enter the ${typeFieldValue} name`,
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
            label={`${capitalizedCodebaseType} name`}
            title={nameRequirementLabel}
            placeholder={`Enter the ${typeFieldValue} name`}
            control={control}
            errors={errors}
        />
    );
};
