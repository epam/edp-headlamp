import { useFormContext } from 'react-hook-form';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { useChosenCodebaseLanguage } from '../../../CreateCodebase/components/CreateCodebaseForm/hooks/useChosenCodebaseLanguage';
import { getRecommendedJenkinsAgent } from '../../../CreateCodebase/components/CreateCodebaseForm/utils';
import { FormRadioGroup } from '../../../FormComponents';
import { FrameworkProps } from './types';

const { Grid } = MuiCore;

export const Framework = ({ names, handleFormFieldChange, type }: FrameworkProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const buildToolValue = watch(names.buildTool.name);
    const langValue = watch(names.lang.name);

    const onFrameworkChange = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            handleFormFieldChange({ name, value });
            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(type, {
                lang: langValue,
                framework: value,
                buildTool: buildToolValue,
            });
            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange({
                name: names.jenkinsSlave.name,
                value: recommendedJenkinsAgent,
            });
        },
        [buildToolValue, handleFormFieldChange, langValue, names.jenkinsSlave.name, setValue, type]
    );

    const { chosenLang } = useChosenCodebaseLanguage({ type, langValue });

    return (
        <Grid item xs={12}>
            <FormRadioGroup
                {...register(names.framework.name, {
                    required: `Select ${type} version/framework`,
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
        </Grid>
    );
};
