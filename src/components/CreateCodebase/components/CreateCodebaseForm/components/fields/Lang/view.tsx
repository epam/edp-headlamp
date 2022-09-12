import { useFormContext } from 'react-hook-form';
import { APPLICATION_MAPPING } from '../../../../../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../../../../../configs/codebase-mappings/autotest';
import { LIBRARY_MAPPING } from '../../../../../../../configs/codebase-mappings/library';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../../../../../constants/codebaseTypes';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FieldEvent } from '../../../../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../../../../utils/format/capitalizeFirstLetter';
import { FormRadio } from '../../../../../../FormComponents/FormRadio';
import { getRecommendedJenkinsAgent } from '../../../utils';
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

            const recommendedJenkinsAgent = getRecommendedJenkinsAgent(type, {
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
