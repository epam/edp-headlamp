import { useFormContext } from 'react-hook-form';
import { getApplicationRecommendedJenkinsAgent } from '../../../../../../../configs/codebase-mappings/application';
import { getLibraryRecommendedJenkinsAgent } from '../../../../../../../configs/codebase-mappings/library';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../../../constants';
import { NamespaceProps } from './types';

const { Grid } = MuiCore;

export const Namespace = ({ names, handleFormFieldChange, namespaces, type }: NamespaceProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const namespaceFieldValue = watch(names.namespace.name);

    const langValue = watch(names.lang.name);
    const frameworkValue = watch(names.framework.name);
    const buildToolValue = watch(names.buildTool.name);
    const recommendedJenkinsAgent = React.useMemo(() => {
        if (namespaceFieldValue) {
            return type === CODEBASE_TYPE_APPLICATION
                ? getApplicationRecommendedJenkinsAgent(langValue, frameworkValue, buildToolValue)
                : type === CODEBASE_TYPE_LIBRARY
                ? getLibraryRecommendedJenkinsAgent(langValue, frameworkValue, buildToolValue)
                : type === CODEBASE_TYPE_AUTOTEST
                ? null
                : null;
        }
    }, [buildToolValue, frameworkValue, langValue, namespaceFieldValue, type]);

    const onNamespaceChange = React.useCallback(
        event => {
            const jenkinsSlaveFakeTarget = {
                target: {
                    name: names.jenkinsSlave.name,
                    value: recommendedJenkinsAgent,
                },
            };
            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange(jenkinsSlaveFakeTarget);
            handleFormFieldChange(event);
        },
        [handleFormFieldChange, names.jenkinsSlave.name, recommendedJenkinsAgent, setValue]
    );

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.namespace.name, {
                    required: 'Select the existing namespace',
                    onBlur: onNamespaceChange,
                })}
                label={'Namespace'}
                placeholder={'Namespace'}
                title={'Select the existing namespace'}
                control={control}
                errors={errors}
                options={namespaces.map(el => ({ label: el, value: el }))}
            />
        </Grid>
    );
};
