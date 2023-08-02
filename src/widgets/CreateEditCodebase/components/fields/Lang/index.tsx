import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../../configs/codebase-mappings';
import { CI_TOOLS } from '../../../../../constants/ciTools';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import { FormRadioGroup } from '../../../../../providers/Form/components/FormRadioGroup';
import { FormRadioOption } from '../../../../../providers/Form/components/FormRadioGroup/types';
import { FieldEvent } from '../../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { getRecommendedJenkinsAgent } from '../../../utils';
import { CreateCodebaseFormValues } from '../../Create/types';

export const Lang = () => {
    const {
        unregister,
        register,
        control,
        formState: { errors },
        resetField,
        setValue,
        watch,
    } = useFormContext<CreateCodebaseFormValues>();

    const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
    const frameworkValue = watch(CODEBASE_FORM_NAMES.framework.name);
    const buildToolValue = watch(CODEBASE_FORM_NAMES.buildTool.name);
    const strategyValue = watch(CODEBASE_FORM_NAMES.strategy.name);
    const CIToolFieldValue = watch(CODEBASE_FORM_NAMES.ciTool.name);

    const capitalizedCodebaseType = capitalizeFirstLetter(typeFieldValue);

    const langOptions = React.useMemo(() => {
        const codebaseMapping = getCodebaseMappingByCodebaseType(typeFieldValue);

        const resultOptions: FormRadioOption[] = [];

        if (!codebaseMapping) {
            return resultOptions;
        }

        Object.values(codebaseMapping).map(
            ({ language: { name, value, icon, availableCITools: mappingAvailableCITools } }) => {
                for (const availableCITool of mappingAvailableCITools) {
                    if (availableCITool !== CIToolFieldValue) {
                        continue;
                    }

                    resultOptions.push({
                        value,
                        label: name,
                        icon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                        checkedIcon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                        disabled:
                            value === CODEBASE_COMMON_LANGUAGES.OTHER &&
                            strategyValue === CODEBASE_CREATION_STRATEGIES.CREATE,
                    });

                    break;
                }
            }
        );

        return resultOptions;
    }, [CIToolFieldValue, strategyValue, typeFieldValue]);

    const onLangChange = React.useCallback(
        async ({ target: { value } }: FieldEvent) => {
            resetField(CODEBASE_FORM_NAMES.jenkinsSlave.name);
            resetField(CODEBASE_FORM_NAMES.framework.name);
            resetField(CODEBASE_FORM_NAMES.buildTool.name);
            unregister(CODEBASE_FORM_NAMES.framework.name);

            if (CIToolFieldValue !== CI_TOOLS.JENKINS) {
                return;
            }

            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(typeFieldValue, {
                lang: value,
                framework: frameworkValue,
                buildTool: buildToolValue,
            });

            setValue(CODEBASE_FORM_NAMES.jenkinsSlave.name, recommendedJenkinsAgent);
        },
        [
            CIToolFieldValue,
            buildToolValue,
            frameworkValue,
            resetField,
            setValue,
            typeFieldValue,
            unregister,
        ]
    );

    return (
        <FormRadioGroup
            {...register(CODEBASE_FORM_NAMES.lang.name, {
                required: `Select codebase language`,
                onChange: onLangChange,
            })}
            control={control}
            errors={errors}
            label={`${capitalizedCodebaseType} code language`}
            options={langOptions}
        />
    );
};
