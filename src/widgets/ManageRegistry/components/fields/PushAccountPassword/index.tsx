import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FieldEvent, FORM_MODES } from '../../../../../types/forms';
import { ValueOf } from '../../../../../types/global';
import { REGISTRY_NAMES } from '../../../names';
import { ManageRegistryDataContext } from '../../../types';

export const PushAccountPassword = ({ mode }: { mode: ValueOf<typeof FORM_MODES> }) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useReactHookFormContext();

    const {
        formData: { pushAccountSecret },
    } = useFormContext<ManageRegistryDataContext>();

    const useSameAccountFieldValue = watch(REGISTRY_NAMES.USE_SAME_ACCOUNT);

    const hasOwnerReference = !!pushAccountSecret?.metadata?.ownerReferences;

    return (
        <FormTextField
            {...register(REGISTRY_NAMES.PUSH_ACCOUNT_PASSWORD, {
                required: 'Enter password or token',
                onChange: ({ target: { value } }: FieldEvent) => {
                    if (!useSameAccountFieldValue) {
                        return;
                    }

                    setValue(REGISTRY_NAMES.PULL_ACCOUNT_PASSWORD, value);
                },
            })}
            label={`Password / Token`}
            title={
                'Enter the confidential combination used for authenticating your access to the Container registry.'
            }
            placeholder={'Enter password or token'}
            control={control}
            errors={errors}
            TextFieldProps={{ type: 'password' }}
            disabled={mode === FORM_MODES.EDIT && hasOwnerReference}
        />
    );
};
