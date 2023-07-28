import React from 'react';
import { useFormContext } from 'react-hook-form';
import { triggerTypeSelectOptions } from '../../../../../configs/select-options/triggerTypes';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

export const TriggerType = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateEditStageFormValues>();

    return (
        <FormSelect
            {...register(STAGE_FORM_NAMES.triggerType.name, {
                required: 'Select trigger type',
            })}
            label={'Trigger type'}
            placeholder={'Select trigger type'}
            control={control}
            errors={errors}
            options={triggerTypeSelectOptions}
        />
    );
};
