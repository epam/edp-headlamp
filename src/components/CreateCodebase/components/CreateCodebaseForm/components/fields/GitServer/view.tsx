import { useFormContext } from 'react-hook-form';
import { getGitServers } from '../../../../../../../configs/gitServers';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { GitServerProps } from './types';

const { Grid } = MuiCore;

export const GitServer = ({ names, handleFormFieldChange }: GitServerProps) => {
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
                {...register(names.gitServer.name, {
                    required: 'Select the existing Git Server.',
                    onBlur: handleFormFieldChange,
                })}
                label={'Git Server'}
                placeholder={'Git Server'}
                title={'Select the existing Git Server.'}
                control={control}
                errors={errors}
                options={getGitServers(namespaceFieldValue)}
            />
        </Grid>
    );
};
