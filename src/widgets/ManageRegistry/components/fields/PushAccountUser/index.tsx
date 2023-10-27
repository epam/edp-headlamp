import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { ValueOf } from '../../../../../types/global';
import { REGISTRY_NAMES } from '../../../names';
import { ManageRegistryDataContext } from '../../../types';

export const PushAccountUser = ({ mode }: { mode: ValueOf<typeof FORM_MODES> }) => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { pushAccountSecret },
    } = useFormContext<ManageRegistryDataContext>();

    const hasOwnerReference = !!pushAccountSecret?.metadata?.ownerReferences;

    return (
        <FormTextField
            {...register(REGISTRY_NAMES.PUSH_ACCOUNT_USER, {
                required: 'Enter user name',
            })}
            label={`User`}
            title={
                'Provide the unique identifier linked to your user account on the Container registry.'
            }
            placeholder={'Enter user name'}
            control={control}
            errors={errors}
            disabled={mode === FORM_MODES.EDIT && hasOwnerReference}
        />
    );
};
