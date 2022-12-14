import { useFormContext } from 'react-hook-form';
import { useAvailableCITools } from '../../../../hooks/useAvailableCITools';
import { useNamespace } from '../../../../hooks/useNamespace';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { FormSelect } from '../../../FormComponents';
import { CIToolProps } from './types';

const { Grid } = MuiCore;

export const CITool = ({ names, handleFormFieldChange }: CIToolProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    const { namespace } = useNamespace();

    const { availableCITools } = useAvailableCITools({ namespace });

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.ciTool.name, {
                    required: 'Select CI tool',
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'CI tool'}
                placeholder={'Select CI tool'}
                title={'Select CI tool for building the codebase'}
                control={control}
                errors={errors}
                options={availableCITools.map(el => ({
                    label: capitalizeFirstLetter(el),
                    value: el,
                }))}
            />
        </Grid>
    );
};
