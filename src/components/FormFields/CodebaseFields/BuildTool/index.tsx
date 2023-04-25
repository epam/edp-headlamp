import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../configs/codebase-mappings';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { AvailableCIToolsDataContext } from '../../../CreateCodebase';
import { FormRadioOption } from '../../../CreateCodebase/components/FormRadioGroup/types';
import { useChosenCodebaseLanguage } from '../../../CreateCodebase/hooks/useChosenCodebaseLanguage';
import { getRecommendedJenkinsAgent } from '../../../CreateCodebase/utils';
import { FormRadioGroup } from '../../../FormComponents';
import { FormTextField } from '../../../FormComponents';
import { BuildToolProps } from './types';

export const BuildTool = ({ names, handleFormFieldChange }: BuildToolProps) => {
    const AvailableCIToolsDataContextValue = React.useContext(AvailableCIToolsDataContext);

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

    const onBuildToolChange = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            handleFormFieldChange({ name, value });
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

        Object.values(chosenLang.buildTools).map(({ name, value, icon, availableCITools }) => {
            for (const availableCITool of availableCITools) {
                if (!AvailableCIToolsDataContextValue.includes(availableCITool)) {
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
        });

        return resultOptions;
    }, [AvailableCIToolsDataContextValue, chosenLang]);

    return (
        <>
            {langFieldValue === CODEBASE_COMMON_LANGUAGES['OTHER'] ? (
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
