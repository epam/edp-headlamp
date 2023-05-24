import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../configs/codebase-mappings';
import { CI_TOOLS } from '../../../../constants/ciTools';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormRadioOption } from '../../../CreateCodebase/components/FormRadioGroup/types';
import { useChosenCodebaseLanguage } from '../../../CreateCodebase/hooks/useChosenCodebaseLanguage';
import { getRecommendedJenkinsAgent } from '../../../CreateCodebase/utils';
import { FormRadioGroup, FormTextField } from '../../../FormComponents';
import { FrameworkProps } from './types';

export const Framework = ({ names, handleFormFieldChange }: FrameworkProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const buildToolFieldValue = watch(names.buildTool.name);
    const langFieldValue = watch(names.lang.name);
    const typeFieldValue = watch(names.type.name);
    const CIToolFieldValue = watch(names.ciTool.name);

    const onFrameworkChange = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            handleFormFieldChange({ name, value });
            if (CIToolFieldValue !== CI_TOOLS.JENKINS) {
                return;
            }

            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(typeFieldValue, {
                lang: langFieldValue,
                framework: value,
                buildTool: buildToolFieldValue,
            });
            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange({
                name: names.jenkinsSlave.name,
                value: recommendedJenkinsAgent,
            });
        },
        [
            CIToolFieldValue,
            buildToolFieldValue,
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

    const frameworkOptions = React.useMemo(() => {
        if (!chosenLang) {
            return [];
        }

        const resultOptions: FormRadioOption[] = [];

        Object.values(chosenLang.frameworks).map(
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
                    });

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
                    {...register(names.framework.name, {
                        required: `Enter ${typeFieldValue} provider`,
                        maxLength: {
                            value: 8,
                            message: 'You exceeded the maximum length of 8',
                        },
                        pattern: {
                            value: /[a-z]/,
                            message: 'Invalid provider name: [a-z]',
                        },
                        onBlur: ({ target: { name, value } }: FieldEvent) =>
                            handleFormFieldChange({ name, value }),
                    })}
                    label={`Provider`}
                    placeholder={`Enter provider`}
                    control={control}
                    errors={errors}
                />
            ) : (
                <FormRadioGroup
                    {...register(names.framework.name, {
                        required: `Select ${typeFieldValue} provider`,
                        onChange: onFrameworkChange,
                    })}
                    control={control}
                    errors={errors}
                    label={`Provider`}
                    options={frameworkOptions}
                />
            )}
        </>
    );
};
