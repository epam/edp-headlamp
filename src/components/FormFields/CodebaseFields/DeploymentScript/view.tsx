import { useFormContext } from 'react-hook-form';
import { deploymentScriptSelectOptions } from '../../../../configs/select-options/deploymentScripts';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
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
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Deployment Script'}
                placeholder={'Select deployment Script'}
                title={'Select Deployment Script which will be used for deploy'}
                control={control}
                errors={errors}
                options={deploymentScriptSelectOptions}
            />
        </Grid>
    );
};
