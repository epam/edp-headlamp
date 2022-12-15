import { useFormContext } from 'react-hook-form';
import { useNamespace } from '../../../../hooks/useNamespace';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { JenkinsSlaveProps } from './types';

const { Grid } = MuiCore;

export const JenkinsAgent = ({
    names,
    handleFormFieldChange,
    jenkinsAgents,
}: JenkinsSlaveProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { namespace } = useNamespace();

    return (
        <Grid item xs={12}>
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
        </Grid>
    );
};
