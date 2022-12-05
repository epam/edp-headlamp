import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { StageNameProps } from './types';

export const StageName = ({
    names,
    handleFormFieldChange,
    otherStagesNames,
}: StageNameProps): React.ReactElement => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.name.name, {
                required: `Enter stage name`,
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
                validate: name => {
                    if (otherStagesNames.includes(name)) {
                        return `"${name}" has been already added to the stages that will be created`;
                    }
                },
            })}
            label={'Stage name'}
            title={`Stage name may contain only: lower-case letters, numbers and dashes and cannot start and end
                            with dash. Minimum 2 characters.
                        `}
            placeholder={'Enter stage name'}
            control={control}
            errors={errors}
        />
    );
};
