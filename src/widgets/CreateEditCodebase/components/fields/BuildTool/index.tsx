import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../../configs/codebase-mappings';
import { CodebaseMappingItemInterface } from '../../../../../configs/codebase-mappings/types';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import { FormRadioGroup } from '../../../../../providers/Form/components/FormRadioGroup';
import { FormRadioOption } from '../../../../../providers/Form/components/FormRadioGroup/types';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const BuildTool = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext<CreateCodebaseFormValues>();

    const langFieldValue = watch(CODEBASE_FORM_NAMES.lang.name);
    const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);

    const codebaseMapping = getCodebaseMappingByCodebaseType(typeFieldValue);

    const chosenLang = codebaseMapping?.[langFieldValue];

    const buildToolOptions = React.useMemo(() => {
        if (!chosenLang) {
            return [];
        }

        const resultOptions: FormRadioOption[] = [];

        for (const buildTool of Object.values<CodebaseMappingItemInterface>(
            chosenLang.buildTools
        )) {
            const { name, value, icon } = buildTool;
            resultOptions.push({
                value,
                label: name,
                icon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                checkedIcon: <UseSpriteSymbol name={icon} width={20} height={20} />,
            });
        }

        return resultOptions;
    }, [chosenLang]);

    return (
        <>
            {langFieldValue === CODEBASE_COMMON_LANGUAGES.OTHER ? (
                <FormTextField
                    {...register(CODEBASE_FORM_NAMES.buildTool.name, {
                        required: `Enter ${typeFieldValue} build tool.`,
                        maxLength: {
                            value: 8,
                            message: 'You exceeded the maximum length of 8',
                        },
                        pattern: {
                            value: /[a-z]/,
                            message: 'Invalid build tool name: [a-z]',
                        },
                    })}
                    label={
                        'Choose the build tool your project uses. This information is crucial for accurate build pipeline configuration.'
                    }
                    placeholder={`Enter build tool`}
                    control={control}
                    errors={errors}
                />
            ) : (
                <FormRadioGroup
                    {...register(CODEBASE_FORM_NAMES.buildTool.name, {
                        required: `Select ${typeFieldValue} build tool.`,
                    })}
                    control={control}
                    errors={errors}
                    label={
                        'Choose the build tool your project uses. This information is crucial for accurate build pipeline configuration.'
                    }
                    options={buildToolOptions}
                />
            )}
        </>
    );
};
