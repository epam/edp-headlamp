import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { HostNameProps } from './types';

export const HostName = ({ names, handleFormFieldChange }: HostNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.gitHost.name, {
                required: 'Please enter host name',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Host'}
            placeholder={'Your host name'}
            control={control}
            errors={errors}
        />
    );
};
