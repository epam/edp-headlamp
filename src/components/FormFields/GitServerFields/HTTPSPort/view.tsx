import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { HTTPSPortProps } from './types';

export const HTTPSPort = ({ names, handleFormFieldChange }: HTTPSPortProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.httpsPort.name, {
                required: 'Please enter HTTPS port',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'HTTPS port'}
            placeholder={'Your HTTPS port'}
            control={control}
            errors={errors}
            TextFieldProps={{
                type: 'number',
            }}
        />
    );
};
