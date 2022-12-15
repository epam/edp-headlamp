import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { GitServerProps } from './types';

const { Grid } = MuiCore;

export const GitServer = ({ names, handleFormFieldChange, gitServers }: GitServerProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.gitServer.name, {
                    required: 'Select an existing Git server',
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Git server'}
                title={'Select an existing Git server'}
                control={control}
                errors={errors}
                options={gitServers.map(el => ({ label: el, value: el }))}
            />
        </Grid>
    );
};
