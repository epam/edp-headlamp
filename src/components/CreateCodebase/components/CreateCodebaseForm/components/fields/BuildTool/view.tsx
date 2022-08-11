import { useFormContext } from 'react-hook-form';
import {
    APPLICATION_MAPPING,
    getApplicationRecommendedJenkinsAgent,
} from '../../../../../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../../../../../configs/codebase-mappings/autotest';
import {
    getLibraryRecommendedJenkinsAgent,
    LIBRARY_MAPPING,
} from '../../../../../../../configs/codebase-mappings/library';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../../../constants';
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
            const recommendedJenkinsAgent =
                type === CODEBASE_TYPE_APPLICATION
                    ? getApplicationRecommendedJenkinsAgent(
                          langValue,
                          frameworkValue,
                          event.target.value
                      )
                    : type === CODEBASE_TYPE_LIBRARY
                    ? getLibraryRecommendedJenkinsAgent(
                          langValue,
                          frameworkValue,
                          event.target.value
                      )
                    : type === CODEBASE_TYPE_AUTOTEST
                    ? null
                    : null;
            const jenkinsSlaveFakeTarget = {
                target: {
                    name: names.jenkinsSlave.name,
                    value: recommendedJenkinsAgent,
                },
            };
            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange(jenkinsSlaveFakeTarget);
        },
        [frameworkValue, handleFormFieldChange, langValue, names.jenkinsSlave.name, setValue, type]
    );

    const codebaseMapping = React.useMemo(() => {
        if (type === CODEBASE_TYPE_APPLICATION) {
            return APPLICATION_MAPPING;
        }

        if (type === CODEBASE_TYPE_LIBRARY) {
            return LIBRARY_MAPPING;
        }

        if (type === CODEBASE_TYPE_AUTOTEST) {
            return AUTOTEST_MAPPING;
        }
    }, [type]);

    const chosenLang = React.useMemo(
        () => codebaseMapping[langValue],
        [codebaseMapping, langValue]
    );

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
                    };
                })}
            />
        </Grid>
    );
};
