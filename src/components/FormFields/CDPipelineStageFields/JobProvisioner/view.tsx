import { useFormContext } from 'react-hook-form';
import { useCDPipelineProvisioners } from '../../../../hooks/useCDPipelineProvisioners';
import { useNamespace } from '../../../../hooks/useNamespace';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { JobProvisionerProps } from './types';

export const JobProvisioner = ({ names, handleFormFieldChange }: JobProvisionerProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { namespace } = useNamespace();

    const { CDPipelineProvisioners } = useCDPipelineProvisioners({
        namespace,
    });

    return (
        <FormSelect
            {...register(names.jobProvisioning.name, {
                onChange: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Job provisioner'}
            placeholder={'Select job provisioner'}
            control={control}
            errors={errors}
            options={CDPipelineProvisioners.map(el => ({
                label: el,
                value: el,
            }))}
        />
    );
};
