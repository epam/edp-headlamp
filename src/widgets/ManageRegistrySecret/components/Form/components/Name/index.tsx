import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { CONTAINER_REGISTRY_ITEM_OPTIONS } from '../../../../constants';
import { REGISTRY_SECRET_CREATION_FORM_NAMES } from '../../../../names';
import { ManageRegistrySecretFormDataContext } from '../../../../types';

export const Name = () => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
    } = useReactHookFormContext();

    const {
        formData: { currentElement, secrets },
    } = useFormContext<ManageRegistrySecretFormDataContext>();

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    const options = React.useMemo(
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

    React.useEffect(() => {
        if (!isPlaceholder) {
            return;
        }

        const defaultValue = options.filter(el => !el.disabled)?.[0]?.value;

        setValue(REGISTRY_SECRET_CREATION_FORM_NAMES.name.name, defaultValue, {
            shouldDirty: false,
        });
    }, [isPlaceholder, options, setValue]);

    return (
        <FormSelect
            {...register(REGISTRY_SECRET_CREATION_FORM_NAMES.name.name, {
                required: 'Select type',
            })}
            label={'Type'}
            placeholder={'Select type'}
            control={control}
            errors={errors}
            disabled={!isPlaceholder}
            options={options}
        />
    );
};
