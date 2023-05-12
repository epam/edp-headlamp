import { useFormContext } from 'react-hook-form';
import { useJiraServerNameListQuery } from '../../../../k8s/JiraServer/hooks/useJiraServerNameListQuery';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { getNamespace } from '../../../../utils/getNamespace';
import { FormSelect } from '../../../FormComponents';
import { JiraServerProps } from './types';

export const JiraServer = ({ names, handleFormFieldChange }: JiraServerProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const namespace = getNamespace();
    const { data: jiraServersNames } = useJiraServerNameListQuery();

    return (
        <FormSelect
            {...register(names.jiraServer.name, {
                required:
                    'Select Jira server that will be integrated with the codebase (application, library, autotest).',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Jira server'}
            placeholder={!namespace ? 'Select namespace first' : 'Select Jira server'}
            control={control}
            errors={errors}
            disabled={!namespace}
            options={jiraServersNames.map(el => ({
                label: el,
                value: el,
            }))}
        />
    );
};
