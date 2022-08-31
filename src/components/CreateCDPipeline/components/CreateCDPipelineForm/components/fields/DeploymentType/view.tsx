import { useFormContext } from 'react-hook-form';
import { deploymentTypes } from '../../../../../../../configs/deploymentTypes';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { DeploymentTypeProps } from './types';

const { Grid } = MuiCore;

export const DeploymentType = ({ names, handleFormFieldChange }: DeploymentTypeProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.deploymentType.name, {
                    required: 'Select CI tool which will be used for building your codebase',
                    onBlur: handleFormFieldChange,
                })}
                label={'Deployment Type'}
                placeholder={'Choose deployment type'}
                control={control}
                errors={errors}
                options={deploymentTypes}
            />
        </Grid>
    );
};
