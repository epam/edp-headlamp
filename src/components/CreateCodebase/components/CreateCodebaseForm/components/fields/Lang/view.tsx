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
import { capitalizeFirstLetter } from '../../../../../../../utils/format/capitalizeFirstLetter';
import { FormRadio } from '../../../../../../FormComponents/FormRadio';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../../../constants';
import { LangProps } from './types';

const { Grid } = MuiCore;

const LangFrameworkImage = ({ src }: { src: string }): React.ReactElement => {
    return <img src={src} alt={''} width={20} height={20} style={{ objectFit: 'contain' }} />;
};

const getIconSrc = (icon: string) => {
    try {
        return require(`../../../../../../../assets/applications/${icon}`).default;
    } catch (e) {
        console.error(`Couldn't find an icon in ../../../../../../../assets/applications/${icon}`);
    }
};

export const Lang = ({ names, handleFormFieldChange, type }: LangProps) => {
    const {
        register,
        control,
        formState: { errors },
        resetField,
        setValue,
        watch,
    } = useFormContext();

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

    const capitalizedCodebaseType = capitalizeFirstLetter(type);

    const frameworkValue = watch(names.framework.name);
    const buildToolValue = watch(names.buildTool.name);

    const onLangChange = React.useCallback(
        event => {
            handleFormFieldChange(event);
            resetField(names.jenkinsSlave.name);
            const jenkinsSlaveUndefinedFakeTarget = {
                target: {
                    name: names.jenkinsSlave.name,
                    value: undefined,
                },
            };
            handleFormFieldChange(jenkinsSlaveUndefinedFakeTarget);
            const frameworkFakeTarget = {
                target: {
                    name: names.framework.name,
                    value: undefined,
                },
            };
            resetField(names.framework.name);
            handleFormFieldChange(frameworkFakeTarget);
            const buildToolFakeTarget = {
                target: {
                    name: names.buildTool.name,
                    value: undefined,
                },
            };
            resetField(names.buildTool.name);
            handleFormFieldChange(buildToolFakeTarget);
            const recommendedJenkinsAgent =
                type === CODEBASE_TYPE_APPLICATION
                    ? getApplicationRecommendedJenkinsAgent(
                          event.target.value,
                          frameworkValue,
                          buildToolValue
                      )
                    : type === CODEBASE_TYPE_LIBRARY
                    ? getLibraryRecommendedJenkinsAgent(
                          event.target.value,
                          frameworkValue,
                          buildToolValue
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
        [
            buildToolValue,
            frameworkValue,
            handleFormFieldChange,
            names.buildTool.name,
            names.framework.name,
            names.jenkinsSlave.name,
            resetField,
            setValue,
            type,
        ]
    );

    return (
        <Grid item xs={12}>
            <FormRadio
                {...register(names.lang.name, {
                    onChange: onLangChange,
                })}
                control={control}
                errors={errors}
                label={`${capitalizedCodebaseType} Code Language`}
                title={`Select ${type} language/framework and build tool.`}
                options={Object.values(codebaseMapping).map(
                    ({ language: { name, value, icon } }) => {
                        const src = getIconSrc(icon);
                        return {
                            value,
                            label: name,
                            icon: <LangFrameworkImage src={src} />,
                            checkedIcon: <LangFrameworkImage src={src} />,
                        };
                    }
                )}
            />
        </Grid>
    );
};
