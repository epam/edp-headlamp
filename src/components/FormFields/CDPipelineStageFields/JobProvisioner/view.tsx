import { useFormContext } from 'react-hook-form';
import { useCDPipelineProvisioners } from '../../../../hooks/useCDPipelineProvisioners';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { JobProvisionerProps } from './types';

export const JobProvisioner = ({ names, handleFormFieldChange }: JobProvisionerProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const namespaceFieldValue = watch(names.namespace.name);

    const { CDPipelineProvisioners } = useCDPipelineProvisioners({
        namespace: namespaceFieldValue,
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
