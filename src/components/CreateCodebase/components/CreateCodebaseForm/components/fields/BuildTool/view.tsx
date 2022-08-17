import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { SelectOption } from '../../../../../../../types/forms';
import { FormSelect } from '../../../../../../FormComponents';
import { useChosenCodebaseLanguage } from '../../../hooks/useChosenCodebaseLanguage';
import { getRecommendedJenkinsAgent } from '../../../utils';
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
        event => {
            handleFormFieldChange(event);
            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(type, {
                lang: langValue,
                framework: frameworkValue,
                buildTool: event.target.value,
            });

            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange({
                target: {
                    name: names.jenkinsSlave.name,
                    value: recommendedJenkinsAgent,
                },
            });
        },
        [frameworkValue, handleFormFieldChange, langValue, names.jenkinsSlave.name, setValue, type]
    );

    const { chosenLang } = useChosenCodebaseLanguage({ watch, names, type });

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.buildTool.name, {
                    required: `Select ${type} build tool.`,
                    onBlur: onBuildToolChange,
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
        </Grid>
    );
};
