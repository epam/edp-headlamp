import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useJenkinsAgentsQuery } from '../../../../../k8s/Jenkins/hooks/useJenkinsAgentsQuery';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const JenkinsAgent = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFormValues>();

    const namespace = getDefaultNamespace();
    const { data: jenkinsAgents } = useJenkinsAgentsQuery();

    return (
        <FormSelect
            {...register(CODEBASE_FORM_NAMES.jenkinsSlave.name, {
                required: 'Select Jenkins agent',
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
