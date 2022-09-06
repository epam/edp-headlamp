import { useFormContext } from 'react-hook-form';
import { React } from '../../../../../../../plugin.globals';
import { FormTextField } from '../../../../../../FormComponents/FormTextField';
import { StageNameProps } from './types';

export const StageName = ({ names, handleFormFieldChange }: StageNameProps): React.ReactElement => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.name.name, {
                required: `Stage name may contain only: lower-case letters, numbers and dashes and cannot start and end
                            with dash. Minimum 2 characters.
                        `,
                onBlur: handleFormFieldChange,
            })}
            label={'Stage Name'}
            title={'Pipeline stage name'}
            placeholder={'Enter stage name'}
            control={control}
            errors={errors}
        />
    );
};
