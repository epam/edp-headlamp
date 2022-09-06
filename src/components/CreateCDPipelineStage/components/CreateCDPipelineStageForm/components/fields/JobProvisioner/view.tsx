import { useFormContext } from 'react-hook-form';
import { jobProvisioners } from '../../../../../../../configs/jobProvisioners';
import { React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { JobProvisionerProps } from './types';

export const JobProvisioner = ({ names, handleFormFieldChange }: JobProvisionerProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormSelect
            {...register(names.jobProvisioning.name, {
                onChange: handleFormFieldChange,
            })}
            label={'Job provisioner'}
            placeholder={'Choose job provisioner'}
            control={control}
            errors={errors}
            options={jobProvisioners}
        />
    );
};
