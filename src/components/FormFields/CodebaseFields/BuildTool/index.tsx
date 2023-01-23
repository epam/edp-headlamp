import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../configs/codebase-mappings';
import { React } from '../../../../plugin.globals';
import { FieldEvent, SelectOption } from '../../../../types/forms';
import { useChosenCodebaseLanguage } from '../../../CreateCodebase/components/CreateCodebaseForm/hooks/useChosenCodebaseLanguage';
import { getRecommendedJenkinsAgent } from '../../../CreateCodebase/components/CreateCodebaseForm/utils';
import { FormSelect } from '../../../FormComponents';
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
                <FormSelect
                    {...register(names.buildTool.name, {
                        required: `Select ${typeFieldValue} build tool.`,
                        maxLength: null,
                        pattern: null,
                        onChange: onBuildToolChange,
                    })}
                    label={'Build tool'}
                    placeholder={'Select build tool'}
                    control={control}
                    errors={errors}
                    options={Object.values(chosenLang.buildTools).map(({ name, value }) => {
                        return {
                            label: name,
                            value,
                        } as SelectOption;
                    })}
                />
            )}
        </>
    );
};
