import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { JiraServerProps } from './types';

const { Grid } = MuiCore;

export const JiraServer = ({ names, handleFormFieldChange, jiraServers }: JiraServerProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const namespaceFieldValue = watch(names.namespace.name);

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.jiraServer.name, {
                    required:
                        'Select Jira server that will be integrated with the codebase (application, library, autotest).',
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Jira server'}
                placeholder={!namespaceFieldValue ? 'Select namespace first' : 'Select Jira server'}
                control={control}
                errors={errors}
                disabled={!namespaceFieldValue}
                options={jiraServers.map(el => ({
                    label: el,
                    value: el,
                }))}
            />
        </Grid>
    );
};
