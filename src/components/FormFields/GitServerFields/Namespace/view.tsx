import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { NamespaceProps } from './types';

export const Namespace = ({ names, handleFormFieldChange, namespaces }: NamespaceProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormSelect
            {...register(names.namespace.name, {
                required: 'Select the existing namespace',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Namespace'}
            placeholder={'Namespace'}
            title={'Select the existing namespace'}
            control={control}
            errors={errors}
            options={namespaces.map(el => ({ label: el, value: el }))}
        />
    );
};
