import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FieldEvent } from '../../../../../../../types/forms';
import { FormTextField } from '../../../../../../FormComponents/FormTextField';
import { TicketNamePatternProps } from './types';

const { Grid } = MuiCore;

export const TicketNamePattern = ({ names, handleFormFieldChange }: TicketNamePatternProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.ticketNamePattern.name, {
                    required:
                        'Specify the pattern to find a Jira ticket number in a commit message',
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Specify the pattern to find a Jira ticket number in a commit message'}
                title={'Specify the pattern to find a Jira ticket number in a commit message'}
                placeholder={`PROJECT_NAME-\d{4}`}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
