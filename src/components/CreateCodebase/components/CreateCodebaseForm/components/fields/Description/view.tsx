import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FieldEvent } from '../../../../../../../types/forms';
import { FormTextField } from '../../../../../../FormComponents/FormTextField';
import { DescriptionProps } from './types';

const { Grid } = MuiCore;

export const Description = ({ names, handleFormFieldChange, type }: DescriptionProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.description.name, {
                    required: `Enter ${type} description`,
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Description'}
                title={'Description'}
                placeholder={`Enter ${type} description`}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
