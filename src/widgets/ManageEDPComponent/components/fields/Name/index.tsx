import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { MANAGE_EDP_COMPONENT_DIALOG_NAME } from '../../../constants';
import { EDP_COMPONENT_FORM_NAMES } from '../../../names';
import { ManageEDPComponentDialogForwardedProps, ManageEDPComponentValues } from '../../../types';

export const Name = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageEDPComponentValues>();

    const {
        forwardedProps: { isSystem },
    } = useSpecificDialogContext<ManageEDPComponentDialogForwardedProps>(
        MANAGE_EDP_COMPONENT_DIALOG_NAME
    );

    return (
        <FormTextField
            {...register(EDP_COMPONENT_FORM_NAMES.name.name, {
                required: 'Enter a component name.',
            })}
            label={'Name'}
            title={
                'Enter a service name for the link. This name will be displayed on the overview page. Ensure the name is in lowercase.'
            }
            placeholder={'My component name'}
            control={control}
            errors={errors}
            disabled={isSystem}
        />
    );
};
