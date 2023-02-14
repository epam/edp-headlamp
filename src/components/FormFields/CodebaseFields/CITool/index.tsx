import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { AvailableCIToolsDataContext } from '../../../CreateCodebase/components/CreateCodebaseForm';
import { FormSelect } from '../../../FormComponents';
import { CIToolProps } from './types';

export const CITool = ({ names, handleFormFieldChange }: CIToolProps) => {
    const AvailableCIToolsDataContextValue = React.useContext(AvailableCIToolsDataContext);

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
            options={AvailableCIToolsDataContextValue.map(el => ({
                label: capitalizeFirstLetter(el),
                value: el,
            }))}
        />
    );
};
