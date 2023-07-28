import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { CONTAINER_REGISTRY_ITEM_OPTIONS } from '../../../constants';
import { REGISTRY_SECRET_FORM_NAMES } from '../../../names';
import { ManageRegistrySecretFormDataContext } from '../../../types';

export const Name = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { currentElement, secrets },
    } = useFormContext<ManageRegistrySecretFormDataContext>();

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    const typeOptions = React.useMemo(
        () =>
            Object.values(CONTAINER_REGISTRY_ITEM_OPTIONS).map(({ label, value }) => {
                const alreadyExists = !!secrets?.find(secret => secret?.metadata?.name === value);

                return {
                    label: `${label} (${value})`,
                    value: value,
                    disabled: alreadyExists,
                };
            }),
        [secrets]
    );

    return (
        <FormSelect
            {...register(REGISTRY_SECRET_FORM_NAMES.name.name, {
                required: 'Select type',
            })}
            label={'Type'}
            placeholder={'Select type'}
            control={control}
            errors={errors}
            disabled={!isPlaceholder}
            options={typeOptions}
        />
    );
};
