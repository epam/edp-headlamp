import { useFormContext } from 'react-hook-form';
import { testReportFrameworkSelectOptions } from '../../../../configs/select-options/testReportFrameworks';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { TestReportFrameworkProps } from './types';

const { Grid } = MuiCore;

export const TestReportFramework = ({ names, handleFormFieldChange }: TestReportFrameworkProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.testReportFramework.name, {
                    required: 'Select autotest report framework',
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Autotest report framework'}
                placeholder={'Select autotest report framework'}
                control={control}
                errors={errors}
                options={testReportFrameworkSelectOptions}
            />
        </Grid>
    );
};
