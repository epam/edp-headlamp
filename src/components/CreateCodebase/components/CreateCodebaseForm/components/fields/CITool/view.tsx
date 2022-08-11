import { useFormContext } from 'react-hook-form';
import { ciTools } from '../../../../../../../configs/ciTools';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { CIToolProps } from './types';

const { Grid } = MuiCore;

export const CITool = ({ names, handleFormFieldChange }: CIToolProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.ciTool.name, {
                    required: 'Select CI tool which will be used for building your codebase',
                    onBlur: handleFormFieldChange,
                })}
                label={'Select CI tool'}
                placeholder={'Select CI tool'}
                title={'Select CI tool which will be used for building your codebase'}
                control={control}
                errors={errors}
                options={ciTools}
            />
        </Grid>
    );
};
