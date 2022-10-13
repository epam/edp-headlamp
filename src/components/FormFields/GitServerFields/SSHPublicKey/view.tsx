import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { SSHPublicKeyProps } from './types';

export const SSHPublicKey = ({ names, handleFormFieldChange }: SSHPublicKeyProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.sshPublicKey.name, {
                required: 'Please enter your public SSH key',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Public SSH key'}
            placeholder={'Your public SSH key'}
            control={control}
            errors={errors}
            TextFieldProps={{
                multiline: true,
                minRows: 4,
                maxRows: 4,
            }}
        />
    );
};
