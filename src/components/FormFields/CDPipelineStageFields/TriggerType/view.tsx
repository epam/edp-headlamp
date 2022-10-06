import { useFormContext } from 'react-hook-form';
import { triggerTypeSelectOptions } from '../../../../configs/select-options/triggerTypes';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
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
                onChange: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Trigger type'}
            placeholder={'Choose trigger type'}
            control={control}
            errors={errors}
            options={triggerTypeSelectOptions}
        />
    );
};
