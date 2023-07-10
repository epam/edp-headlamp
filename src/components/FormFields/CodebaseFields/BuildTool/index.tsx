import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../configs/codebase-mappings';
import { CI_TOOLS } from '../../../../constants/ciTools';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { FieldEvent } from '../../../../types/forms';
import { FormRadioOption } from '../../../../widgets/CreateCodebase/components/FormRadioGroup/types';
import { useChosenCodebaseLanguage } from '../../../../widgets/CreateCodebase/hooks/useChosenCodebaseLanguage';
import { getRecommendedJenkinsAgent } from '../../../../widgets/CreateCodebase/utils';
import { FormRadioGroup } from '../../../FormComponents';
import { FormTextField } from '../../../FormComponents';
import { BuildToolProps } from './types';

export const BuildTool = ({ names, handleFormFieldChange }: BuildToolProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const frameworkFieldValue = watch(names.framework.name);
    const langFieldValue = watch(names.lang.name);
    const typeFieldValue = watch(names.type.name);
    const CIToolFieldValue = watch(names.ciTool.name);

    const onBuildToolChange = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            handleFormFieldChange({ name, value });
            if (CIToolFieldValue !== CI_TOOLS.JENKINS) {
                return;
            }

            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(typeFieldValue, {
                lang: langFieldValue,
                framework: frameworkFieldValue,
                buildTool: value,
            });

            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange({
                name: names.jenkinsSlave.name,
                value: recommendedJenkinsAgent,
            });
        },
        [
            CIToolFieldValue,
            frameworkFieldValue,
            handleFormFieldChange,
            langFieldValue,
            names.jenkinsSlave.name,
            setValue,
            typeFieldValue,
        ]
    );

    const { chosenLang } = useChosenCodebaseLanguage({
        type: typeFieldValue,
        lang: langFieldValue,
    });

    const buildToolOptions = React.useMemo(() => {
        if (!chosenLang) {
            return [];
        }

        const resultOptions: FormRadioOption[] = [];

        Object.values(chosenLang.buildTools).map(
            ({ name, value, icon, availableCITools: mappingAvailableCITools }) => {
                for (const availableCITool of mappingAvailableCITools) {
                    if (availableCITool !== CIToolFieldValue) {
                        continue;
                    }

                    resultOptions.push({
                        value,
                        label: name,
                        icon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                        checkedIcon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                    } as FormRadioOption);

                    break;
                }
            }
        );

        return resultOptions;
    }, [CIToolFieldValue, chosenLang]);

    return (
        <>
            {langFieldValue === CODEBASE_COMMON_LANGUAGES.OTHER ? (
                <FormTextField
                    {...register(names.buildTool.name, {
                        required: `Enter ${typeFieldValue} build tool.`,
                        maxLength: {
                            value: 8,
                            message: 'You exceeded the maximum length of 8',
                        },
                        pattern: {
                            value: /[a-z]/,
                            message: 'Invalid build tool name: [a-z]',
                        },
                        onBlur: ({ target: { name, value } }: FieldEvent) =>
                            handleFormFieldChange({ name, value }),
                    })}
                    label={'Build tool'}
                    placeholder={`Enter build tool`}
                    control={control}
                    errors={errors}
                />
            ) : (
                <FormRadioGroup
                    {...register(names.buildTool.name, {
                        required: `Select ${typeFieldValue} build tool.`,
                        onChange: onBuildToolChange,
                    })}
                    control={control}
                    errors={errors}
                    label={`Build tool`}
                    options={buildToolOptions}
                />
            )}
        </>
    );
};
