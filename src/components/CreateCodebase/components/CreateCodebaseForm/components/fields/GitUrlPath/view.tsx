import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormTextField } from '../../../../../../FormComponents/FormTextField';
import { GitUrlPathProps } from './types';

const { Grid } = MuiCore;

export const GitUrlPath = ({ names, handleFormFieldChange }: GitUrlPathProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.gitUrlPath.name, {
                    required: 'Specify relative path to repository.',
                    onBlur: handleFormFieldChange,
                })}
                label={'Relative path'}
                title={'Specify relative path to repository.'}
                placeholder={'Enter repository path'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
