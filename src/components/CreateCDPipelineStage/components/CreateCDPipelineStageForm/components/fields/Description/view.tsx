import { useFormContext } from 'react-hook-form';
import { React } from '../../../../../../../plugin.globals';
import { FormTextField } from '../../../../../../FormComponents/FormTextField';
import { DescriptionProps } from './types';

export const Description = ({
    names,
    handleFormFieldChange,
}: DescriptionProps): React.ReactElement => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.description.name, {
                required: `Can not be empty.`,
                onBlur: handleFormFieldChange,
            })}
            label={'Description'}
            title={'Pipeline stage description'}
            placeholder={'Enter stage description'}
            control={control}
            errors={errors}
        />
    );
};