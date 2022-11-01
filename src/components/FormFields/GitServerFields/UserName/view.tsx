import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { UserNameProps } from './types';

export const UserName = ({ names, handleFormFieldChange }: UserNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.gitUser.name, {
                required: 'Please enter user name',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'User'}
            control={control}
            errors={errors}
        />
    );
};
