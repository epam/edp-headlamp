import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useJenkinsAgentsQuery } from '../../../../k8s/Jenkins/hooks/useJenkinsAgentsQuery';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { FieldEvent } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { JenkinsAgentProps } from './types';

export const JenkinsAgent = ({ names, handleFormFieldChange }: JenkinsAgentProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const namespace = getDefaultNamespace();
    const { data: jenkinsAgents } = useJenkinsAgentsQuery();

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
            options={
                jenkinsAgents &&
                jenkinsAgents.length &&
                jenkinsAgents.map(el => ({
                    label: el,
                    value: el,
                }))
            }
        />
    );
};
