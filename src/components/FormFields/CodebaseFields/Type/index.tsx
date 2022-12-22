import { useFormContext } from 'react-hook-form';
import { codebaseTypeSelectOptions } from '../../../../configs/select-options/codebaseTypeSelectOptions';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { TypeProps } from './types';

export const Type = ({ names, handleFormFieldChange, setType }: TypeProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormSelect
            {...register(names.type.name, {
                required: 'Select a codebase type',
                onChange: ({ target: { name, value } }: FieldEvent) => {
                    setType(value);
                    handleFormFieldChange({ name, value });
                },
            })}
            label={'Codebase type'}
            placeholder={'Select a codebase type'}
            control={control}
            errors={errors}
            options={codebaseTypeSelectOptions}
        />
    );
};
