import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { SecretStringProps } from './types';

export const SecretString = ({ names, handleFormFieldChange }: SecretStringProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.secretString.name, {
                required: 'Please enter your secret string',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Secret string'}
            title={'Enter the secret token to validate payloads'}
            placeholder={'Your secret string'}
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
