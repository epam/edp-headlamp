import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../../configs/codebase-mappings';
import { CI_TOOLS } from '../../../../../constants/ciTools';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import { FormRadioGroup } from '../../../../../providers/Form/components/FormRadioGroup';
import { FormRadioOption } from '../../../../../providers/Form/components/FormRadioGroup/types';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { getRecommendedJenkinsAgent } from '../../../utils';
import { CreateCodebaseFormValues } from '../../Create/types';

export const Framework = () => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext<CreateCodebaseFormValues>();

    const buildToolFieldValue = watch(CODEBASE_FORM_NAMES.buildTool.name);
    const langFieldValue = watch(CODEBASE_FORM_NAMES.lang.name);
    const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
    const CIToolFieldValue = watch(CODEBASE_FORM_NAMES.ciTool.name);

    const onFrameworkChange = React.useCallback(
        ({ target: { value } }: FieldEvent) => {
            if (CIToolFieldValue !== CI_TOOLS.JENKINS) {
                return;
            }

            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(typeFieldValue, {
                lang: langFieldValue,
                framework: value,
                buildTool: buildToolFieldValue,
            });
            setValue(CODEBASE_FORM_NAMES.jenkinsSlave.name, recommendedJenkinsAgent);
        },
        [CIToolFieldValue, buildToolFieldValue, langFieldValue, setValue, typeFieldValue]
    );

    const codebaseMapping = getCodebaseMappingByCodebaseType(typeFieldValue);

    const chosenLang = codebaseMapping?.[langFieldValue];

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
                    {...register(CODEBASE_FORM_NAMES.framework.name, {
                        required: `Enter ${typeFieldValue} language version/framework`,
                        maxLength: {
                            value: 8,
                            message: 'You exceeded the maximum length of 8',
                        },
                        pattern: {
                            value: /[a-z]/,
                            message: 'Invalid language version/framework name: [a-z]',
                        },
                    })}
                    label={`Language version/framework`}
                    placeholder={`Enter language version/framework`}
                    control={control}
                    errors={errors}
                />
            ) : (
                <FormRadioGroup
                    {...register(CODEBASE_FORM_NAMES.framework.name, {
                        required: `Select ${typeFieldValue} language version/framework`,
                        onChange: onFrameworkChange,
                    })}
                    control={control}
                    errors={errors}
                    label={`Language version/framework`}
                    options={frameworkOptions}
                />
            )}
        </>
    );
};
