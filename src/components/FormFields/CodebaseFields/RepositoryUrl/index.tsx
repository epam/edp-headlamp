import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { RepositoryUrlProps } from './types';

export const RepositoryUrl = ({ names, handleFormFieldChange }: RepositoryUrlProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const fieldRequirementLabel =
        'Specify the application URL in the following format: http(s)://git.sample.com/sample';

    return (
        <FormTextField
            {...register(names.repositoryUrl.name, {
                required: fieldRequirementLabel,
                pattern: {
                    value: /((git|ssh|http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@/-~]+)\w/,
                    message: fieldRequirementLabel,
                },
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Repository URL'}
            title={fieldRequirementLabel}
            placeholder={'http(s)://git.sample.com/sample'}
            control={control}
            errors={errors}
        />
    );
};
