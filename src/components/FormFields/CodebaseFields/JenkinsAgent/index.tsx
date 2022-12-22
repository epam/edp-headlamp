import { useFormContext } from 'react-hook-form';
import { useJenkinsAgents } from '../../../../hooks/useJenkinsAgents';
import { useNamespace } from '../../../../hooks/useNamespace';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { JenkinsAgentProps } from './types';

export const JenkinsAgent = ({ names, handleFormFieldChange }: JenkinsAgentProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { namespace } = useNamespace();
    const { jenkinsAgents } = useJenkinsAgents({ namespace });

    return (
        <FormSelect
            {...register(names.jenkinsSlave.name, {
                required: 'Select Jenkins agent',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Jenkins agent'}
            placeholder={!namespace ? 'Select namespace first' : 'Select Jenkins agent'}
            control={control}
            errors={errors}
            disabled={!namespace}
            options={jenkinsAgents.map(el => ({
                label: el,
                value: el,
            }))}
        />
    );
};
