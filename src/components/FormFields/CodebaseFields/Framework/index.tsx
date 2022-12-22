import { useFormContext } from 'react-hook-form';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { useChosenCodebaseLanguage } from '../../../CreateCodebase/components/CreateCodebaseForm/hooks/useChosenCodebaseLanguage';
import { getRecommendedJenkinsAgent } from '../../../CreateCodebase/components/CreateCodebaseForm/utils';
import { FormRadioGroup } from '../../../FormComponents';
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

    const onFrameworkChange = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            handleFormFieldChange({ name, value });
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

    return (
        <FormRadioGroup
            {...register(names.framework.name, {
                required: `Select ${typeFieldValue} version/framework`,
                onChange: onFrameworkChange,
            })}
            control={control}
            errors={errors}
            label={`Language version/framework`}
            options={Object.values(chosenLang.frameworks).map(({ name, value, icon }) => ({
                value,
                label: name,
                icon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                checkedIcon: <UseSpriteSymbol name={icon} width={20} height={20} />,
            }))}
        />
    );
};
