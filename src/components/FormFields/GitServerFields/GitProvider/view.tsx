import { useFormContext } from 'react-hook-form';
import { gitProviderOptions } from '../../../../configs/select-options/gitProviders';
import { GitProviders } from '../../../../icons/sprites/GitProviders';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormRadioGroup } from '../../../FormComponents/FormRadioGroup';
import { GitProviderProps } from './types';

export const GitProvider = ({ names, handleFormFieldChange }: GitProviderProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <GitProviders />
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
                        icon: <UseSpriteSymbol name={value} width={20} height={20} />,
                        checkedIcon: <UseSpriteSymbol name={value} width={20} height={20} />,
                    };
                })}
            />
        </>
    );
};
