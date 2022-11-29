import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { JenkinsSlaveProps } from './types';

const { Grid } = MuiCore;

export const JenkinsSlave = ({
    names,
    handleFormFieldChange,
    jenkinsAgents,
}: JenkinsSlaveProps) => {
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
                {...register(names.jenkinsSlave.name, {
                    required: 'Select Jenkins agent',
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Jenkins agent'}
                placeholder={
                    !namespaceFieldValue ? 'Select namespace first' : 'Select Jenkins agent'
                }
                control={control}
                errors={errors}
                disabled={!namespaceFieldValue}
                options={jenkinsAgents.map(el => ({
                    label: el,
                    value: el,
                }))}
            />
        </Grid>
    );
};
