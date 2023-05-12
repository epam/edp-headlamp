import { useFormContext } from 'react-hook-form';
import { useJiraServerNameListQuery } from '../../../../k8s/JiraServer/hooks/useJiraServerNameListQuery';
import { MuiCore, MuiLab, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormCheckbox, FormControlLabelWithTooltip } from '../../../FormComponents';
import { Render } from '../../../Render';
import { JiraServerIntegrationProps } from './types';

const { Grid } = MuiCore;
const { Alert } = MuiLab;

export const JiraServerIntegration = ({
    names,
    handleFormFieldChange,
}: JiraServerIntegrationProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { data: jiraServersNames } = useJiraServerNameListQuery();

    return (
        <Grid container spacing={2}>
            <Render condition={jiraServersNames && !jiraServersNames.length}>
                <Grid item xs={12}>
                    <Alert severity="info" elevation={2} variant="filled">
                        There are no available Jira servers
                    </Alert>
                </Grid>
            </Render>
            <Grid item xs={12}>
                <FormCheckbox
                    {...register(names.hasJiraServerIntegration.name, {
                        onChange: ({ target: { name, value } }: FieldEvent) =>
                            handleFormFieldChange({ name, value }),
                    })}
                    label={<FormControlLabelWithTooltip label={'Integrate with Jira server'} />}
                    control={control}
                    errors={errors}
                    disabled={jiraServersNames && !jiraServersNames.length}
                />
            </Grid>
        </Grid>
    );
};
