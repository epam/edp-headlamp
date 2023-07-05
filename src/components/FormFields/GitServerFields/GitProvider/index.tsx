import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_PROVIDER_ICON_MAPPING } from '../../../../configs/icon-mappings';
import { gitProviderOptions } from '../../../../configs/select-options/gitProviders';
import { Resources } from '../../../../icons/sprites/Resources';
import { RESOURCE_ICON_NAMES } from '../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { FieldEvent } from '../../../../types/forms';
import { FormRadioGroup } from '../../../FormComponents';
import { GitProviderProps } from './types';

export const GitProvider = ({ names, handleFormFieldChange }: GitProviderProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Resources />
            <FormRadioGroup
                {...register(names.gitProvider.name, {
                    required: `Select Git provider`,
                    onChange: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                control={control}
                errors={errors}
                label={'Git provider'}
                title={'Select Git provider'}
                options={gitProviderOptions.map(({ label, value }) => {
                    return {
                        value,
                        label,
                        icon: (
                            <UseSpriteSymbol
                                name={
                                    GIT_PROVIDER_ICON_MAPPING?.[value] || RESOURCE_ICON_NAMES.OTHER
                                }
                                width={20}
                                height={20}
                            />
                        ),
                        checkedIcon: (
                            <UseSpriteSymbol
                                name={
                                    GIT_PROVIDER_ICON_MAPPING?.[value] || RESOURCE_ICON_NAMES.OTHER
                                }
                                width={20}
                                height={20}
                            />
                        ),
                    };
                })}
            />
        </>
    );
};
