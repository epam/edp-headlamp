import { useFormContext } from 'react-hook-form';
import { getCreationStrategies } from '../../../../../../../configs/creationStrategies';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { StrategyProps } from './types';

const { Grid } = MuiCore;

export const Strategy = ({ names, handleFormFieldChange, type }: StrategyProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.strategy.name, {
                    required: 'Select the existing codebase creation strategy',
                    onBlur: handleFormFieldChange,
                })}
                label={'Codebase Integration Strategy'}
                placeholder={'Codebase Integration Strategy'}
                title={'Select the existing codebase for reproduction or create new codebase.'}
                control={control}
                errors={errors}
                options={getCreationStrategies(type)}
            />
        </Grid>
    );
};
