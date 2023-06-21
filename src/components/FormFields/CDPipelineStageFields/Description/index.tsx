import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { DescriptionProps } from './types';

export const Description = ({ names, handleFormFieldChange }: DescriptionProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.description.name, {
                required: `Enter stage description`,
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Description'}
            placeholder={'Enter stage description'}
            control={control}
            errors={errors}
        />
    );
};
