import { useFormContext } from 'react-hook-form';
import { deploymentScripts } from '../../../../../../../configs/deploymentScripts';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { DeploymentScriptProps } from './types';

const { Grid } = MuiCore;

export const DeploymentScript = ({ names, handleFormFieldChange }: DeploymentScriptProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.deploymentScript.name, {
                    required: 'Select Deployment Script which will be used for deploy',
                    onChange: handleFormFieldChange,
                })}
                label={'Deployment Script'}
                placeholder={'Select deployment Script'}
                title={'Select Deployment Script which will be used for deploy'}
                control={control}
                errors={errors}
                options={deploymentScripts}
            />
        </Grid>
    );
};
