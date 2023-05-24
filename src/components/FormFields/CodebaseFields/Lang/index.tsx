import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../configs/codebase-mappings';
import { APPLICATION_MAPPING } from '../../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../../configs/codebase-mappings/autotest';
import { INFRASTRUCTURE_MAPPING } from '../../../../configs/codebase-mappings/infrastructure';
import { LIBRARY_MAPPING } from '../../../../configs/codebase-mappings/library';
import { CI_TOOLS } from '../../../../constants/ciTools';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../constants/creationStrategies';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { FormRadioOption } from '../../../CreateCodebase/components/FormRadioGroup/types';
import { getRecommendedJenkinsAgent } from '../../../CreateCodebase/utils';
import { FormRadioGroup } from '../../../FormComponents';
import { LangProps } from './types';

export const Lang = ({ names, handleFormFieldChange }: LangProps) => {
    const {
        register,
        control,
        formState: { errors },
        resetField,
        setValue,
        watch,
    } = useFormContext();

    const typeFieldValue = watch(names.type.name);
    const frameworkValue = watch(names.framework.name);
    const buildToolValue = watch(names.buildTool.name);
    const strategyValue = watch(names.strategy.name);
    const CIToolFieldValue = watch(names.ciTool.name);

    const codebaseMapping = React.useMemo(() => {
        if (!typeFieldValue) {
            return null;
        }

        if (typeFieldValue === CODEBASE_TYPES.APPLICATION) {
            return APPLICATION_MAPPING;
        }

        if (typeFieldValue === CODEBASE_TYPES.LIBRARY) {
            return LIBRARY_MAPPING;
        }

        if (typeFieldValue === CODEBASE_TYPES.AUTOTEST) {
            return AUTOTEST_MAPPING;
        }

        if (typeFieldValue === CODEBASE_TYPES.INFRASTRUCTURE) {
            return INFRASTRUCTURE_MAPPING;
        }
    }, [typeFieldValue]);

    const capitalizedCodebaseType = capitalizeFirstLetter(typeFieldValue);

    const langOptions = React.useMemo(() => {
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
                            value === CODEBASE_COMMON_LANGUAGES['OTHER'] &&
                            strategyValue === CODEBASE_CREATION_STRATEGIES['CREATE'],
                    });

                    break;
                }
            }
        );

        return resultOptions;
    }, [CIToolFieldValue, codebaseMapping, strategyValue]);

    const resetFields = React.useCallback(
        (fieldNames: string[]) => {
            for (const fieldName of fieldNames) {
                resetField(fieldName);
                handleFormFieldChange({
                    name: fieldName,
                    value: undefined,
                });
            }
        },
        [handleFormFieldChange, resetField]
    );

    const onLangChange = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            handleFormFieldChange({ name, value });

            resetFields([names.jenkinsSlave.name, names.framework.name, names.buildTool.name]);

            if (CIToolFieldValue !== CI_TOOLS.JENKINS) {
                return;
            }

            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(typeFieldValue, {
                lang: value,
                framework: frameworkValue,
                buildTool: buildToolValue,
            });

            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange({
                name: names.jenkinsSlave.name,
                value: recommendedJenkinsAgent,
            });
        },
        [
            CIToolFieldValue,
            buildToolValue,
            frameworkValue,
            handleFormFieldChange,
            names.buildTool.name,
            names.framework.name,
            names.jenkinsSlave.name,
            resetFields,
            setValue,
            typeFieldValue,
        ]
    );

    return (
        <FormRadioGroup
            {...register(names.lang.name, {
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
