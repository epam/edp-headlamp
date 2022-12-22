import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../configs/codebase-mappings';
import { APPLICATION_MAPPING } from '../../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../../configs/codebase-mappings/autotest';
import { LIBRARY_MAPPING } from '../../../../configs/codebase-mappings/library';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../constants/creationStrategies';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { getRecommendedJenkinsAgent } from '../../../CreateCodebase/components/CreateCodebaseForm/utils';
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

    const codebaseMapping = React.useMemo(() => {
        if (typeFieldValue === CODEBASE_TYPES['APPLICATION']) {
            return APPLICATION_MAPPING;
        }

        if (typeFieldValue === CODEBASE_TYPES['LIBRARY']) {
            return LIBRARY_MAPPING;
        }

        if (typeFieldValue === CODEBASE_TYPES['AUTOTEST']) {
            return AUTOTEST_MAPPING;
        }
    }, [typeFieldValue]);

    const capitalizedCodebaseType = capitalizeFirstLetter(typeFieldValue);

    const frameworkValue = watch(names.framework.name);
    const buildToolValue = watch(names.buildTool.name);
    const strategyValue = watch(names.strategy.name);

    const onLangChange = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            handleFormFieldChange({ name, value });

            resetField(names.jenkinsSlave.name);
            handleFormFieldChange({
                name: names.jenkinsSlave.name,
                value: undefined,
            });

            resetField(names.framework.name);
            handleFormFieldChange({
                name: names.framework.name,
                value: undefined,
            });

            resetField(names.buildTool.name);
            handleFormFieldChange({
                name: names.buildTool.name,
                value: undefined,
            });

            if (value === CODEBASE_COMMON_LANGUAGES['OTHER']) {
                setValue(names.framework.name, CODEBASE_COMMON_LANGUAGES['OTHER']);
            }

            handleFormFieldChange({
                name: names.framework.name,
                value: CODEBASE_COMMON_LANGUAGES['OTHER'],
            });

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
            buildToolValue,
            frameworkValue,
            handleFormFieldChange,
            names.buildTool.name,
            names.framework.name,
            names.jenkinsSlave.name,
            resetField,
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
            options={Object.values(codebaseMapping).map(({ language: { name, value, icon } }) => ({
                value,
                label: name,
                icon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                checkedIcon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                disabled:
                    value === 'other' && strategyValue === CODEBASE_CREATION_STRATEGIES['CREATE'],
            }))}
        />
    );
};
