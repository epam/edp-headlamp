import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const TicketNamePattern = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFormValues>();

    return (
        <FormTextField
            {...register(CODEBASE_FORM_NAMES.ticketNamePattern.name, {
                required: 'Specify the pattern to find a Jira ticket number in a commit message',
            })}
            label={'Specify the pattern to find a Jira ticket number in a commit message'}
            placeholder={'PROJECT_NAME-\\d{4}'}
            control={control}
            errors={errors}
        />
    );
};
