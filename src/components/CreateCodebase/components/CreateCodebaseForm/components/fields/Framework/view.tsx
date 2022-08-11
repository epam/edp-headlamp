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
import { FrameworkProps } from './types';

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

export const Framework = ({ names, handleFormFieldChange, type }: FrameworkProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const capitalizedCodebaseType = capitalizeFirstLetter(type);

    const buildToolValue = watch(names.buildTool.name);
    const langValue = watch(names.lang.name);

    const onFrameworkChange = React.useCallback(
        event => {
            handleFormFieldChange(event);
            const recommendedJenkinsAgent =
                type === CODEBASE_TYPE_APPLICATION
                    ? getApplicationRecommendedJenkinsAgent(
                          langValue,
                          event.target.value,
                          buildToolValue
                      )
                    : type === CODEBASE_TYPE_LIBRARY
                    ? getLibraryRecommendedJenkinsAgent(
                          langValue,
                          event.target.value,
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
        [buildToolValue, handleFormFieldChange, langValue, names.jenkinsSlave.name, setValue, type]
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
            <FormRadio
                {...register(names.framework.name, {
                    onChange: onFrameworkChange,
                })}
                control={control}
                errors={errors}
                label={`${capitalizedCodebaseType} Code Framework`}
                title={`Select ${type} language/framework and build tool.`}
                options={Object.values(chosenLang.frameworks).map(({ name, value, icon }) => {
                    const src = getIconSrc(icon);
                    return {
                        value,
                        label: name,
                        icon: <LangFrameworkImage src={src} />,
                        checkedIcon: <LangFrameworkImage src={src} />,
                    };
                })}
            />
        </Grid>
    );
};
