import { useFormContext } from 'react-hook-form';
import { deploymentTypeSelectOptions } from '../../../../configs/select-options/deploymentTypes';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
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
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Deployment Type'}
                placeholder={'Choose deployment type'}
                control={control}
                errors={errors}
                options={deploymentTypeSelectOptions}
            />
        </Grid>
    );
};
