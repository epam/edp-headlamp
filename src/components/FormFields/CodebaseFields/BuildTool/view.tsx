import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent, SelectOption } from '../../../../types/forms';
import { useChosenCodebaseLanguage } from '../../../CreateCodebase/components/CreateCodebaseForm/hooks/useChosenCodebaseLanguage';
import { getRecommendedJenkinsAgent } from '../../../CreateCodebase/components/CreateCodebaseForm/utils';
import { FormSelect } from '../../../FormComponents';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { BuildToolProps } from './types';

const { Grid } = MuiCore;

export const BuildTool = ({ names, handleFormFieldChange, type }: BuildToolProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const frameworkValue = watch(names.framework.name);
    const langValue = watch(names.lang.name);

    const onBuildToolChange = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            handleFormFieldChange({ name, value });
            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(type, {
                lang: langValue,
                framework: frameworkValue,
                buildTool: value,
            });

            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange({
                name: names.jenkinsSlave.name,
                value: recommendedJenkinsAgent,
            });
        },
        [frameworkValue, handleFormFieldChange, langValue, names.jenkinsSlave.name, setValue, type]
    );

    const { chosenLang } = useChosenCodebaseLanguage({ type, langValue });

    return (
        <Grid item xs={12}>
            {langValue === 'other' ? (
                <FormTextField
                    {...register(names.buildTool.name, {
                        required: `Enter ${type} build tool.`,
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
                    label={'Build Tool'}
                    title={`Enter ${type} build tool.`}
                    placeholder={`Enter build tool`}
                    control={control}
                    errors={errors}
                />
            ) : (
                <FormSelect
                    {...register(names.buildTool.name, {
                        required: `Select ${type} build tool.`,
                        maxLength: null,
                        pattern: null,
                        onChange: onBuildToolChange,
                    })}
                    label={'Select Build Tool'}
                    placeholder={'Select Build Tool'}
                    title={`Select ${type} build tool.`}
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
        </Grid>
    );
};
