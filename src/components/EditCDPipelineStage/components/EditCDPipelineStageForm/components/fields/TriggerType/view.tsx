import { useFormContext } from 'react-hook-form';
import { triggerTypes } from '../../../../../../../configs/triggerTypes';
import { React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { TriggerTypeProps } from './types';

export const TriggerType = ({ names, handleFormFieldChange }: TriggerTypeProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormSelect
            {...register(names.triggerType.name, {
                required: 'Stage provisioning trigger type',
                onChange: handleFormFieldChange,
            })}
            label={'Trigger type'}
            placeholder={'Choose trigger type'}
            control={control}
            errors={errors}
            options={triggerTypes}
        />
    );
};
