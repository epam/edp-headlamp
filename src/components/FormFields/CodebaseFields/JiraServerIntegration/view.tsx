import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormCheckbox } from '../../../FormComponents/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../FormComponents/FormControlLabelWithTooltip';
import { JiraServerIntegrationProps } from './types';

const { Grid } = MuiCore;

export const JiraServerIntegration = ({
    names,
    handleFormFieldChange,
    isDisabled,
}: JiraServerIntegrationProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormCheckbox
                {...register(names.hasJiraServerIntegration.name, {
                    onChange: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={<FormControlLabelWithTooltip label={'Integrate with Jira server'} />}
                control={control}
                errors={errors}
                disabled={isDisabled}
            />
        </Grid>
    );
};
