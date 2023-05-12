import { useFormContext } from 'react-hook-form';
import { useAvailableCIToolsQuery } from '../../../../k8s/EDPComponent/hooks/useAvailableCIToolsQuery';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { FormSelect } from '../../../FormComponents';
import { CIToolProps } from './types';

export const CITool = ({ names, handleFormFieldChange }: CIToolProps) => {
    const { data: availableCITools } = useAvailableCIToolsQuery();

    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
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
            options={
                availableCITools &&
                availableCITools.map(el => ({
                    label: capitalizeFirstLetter(el),
                    value: el,
                }))
            }
        />
    );
};
