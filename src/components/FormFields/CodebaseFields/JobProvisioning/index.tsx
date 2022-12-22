import { useFormContext } from 'react-hook-form';
import { useCIPipelineProvisioners } from '../../../../hooks/useCIPipelineProvisioners';
import { useNamespace } from '../../../../hooks/useNamespace';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { JobProvisioningProps } from './types';

export const JobProvisioning = ({ names, handleFormFieldChange }: JobProvisioningProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { namespace } = useNamespace();

    const { CIPipelineProvisioners } = useCIPipelineProvisioners({
        namespace,
    });

    return (
        <FormSelect
            {...register(names.jobProvisioning.name, {
                required: 'Select CI pipeline provisioner',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'CI pipeline provisioner'}
            placeholder={'Select CI pipeline provisioner'}
            control={control}
            errors={errors}
            options={CIPipelineProvisioners.map(el => ({
                label: el,
                value: el,
            }))}
        />
    );
};
