import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { SSHPortProps } from './types';

export const SSHPort = ({ names, handleFormFieldChange }: SSHPortProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.sshPort.name, {
                required: 'Please enter SSH port',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'SSH port'}
            placeholder={'Your SSH port'}
            control={control}
            errors={errors}
            TextFieldProps={{
                type: 'number',
            }}
        />
    );
};
