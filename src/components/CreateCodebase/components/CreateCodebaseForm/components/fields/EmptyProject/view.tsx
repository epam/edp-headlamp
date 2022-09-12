import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FieldEvent } from '../../../../../../../types/forms';
import { FormCheckbox } from '../../../../../../FormComponents/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../FormComponents/FormControlLabelWithTooltip';
import { EmptyProjectProps } from './types';

const { Grid } = MuiCore;

export const EmptyProject = ({ names, handleFormFieldChange }: EmptyProjectProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormCheckbox
                {...register(names.emptyProject.name, {
                    onChange: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={
                    <FormControlLabelWithTooltip
                        label={'Empty project'}
                        title={
                            'An empty project will not contain any template code, besides EDP pipelines and deploy-templates.'
                        }
                    />
                }
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
