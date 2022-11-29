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
                required: 'Enter SSH port',
                pattern: {
                    value: /^(\d{1,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                    message: 'Enter correct ssh port',
                },
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'SSH port'}
            placeholder={'Enter SSH port'}
            control={control}
            errors={errors}
            TextFieldProps={{
                type: 'number',
            }}
        />
    );
};
