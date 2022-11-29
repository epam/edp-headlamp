import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { getRecommendedJenkinsAgent } from '../../../CreateCodebase/components/CreateCodebaseForm/utils';
import { FormSelect } from '../../../FormComponents';
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
            return getRecommendedJenkinsAgent(type, {
                lang: langValue,
                framework: frameworkValue,
                buildTool: buildToolValue,
            });
        }
    }, [buildToolValue, frameworkValue, langValue, namespaceFieldValue, type]);

    const onNamespaceChange = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            setValue(names.jenkinsSlave.name, recommendedJenkinsAgent);
            handleFormFieldChange({
                name: names.jenkinsSlave.name,
                value: recommendedJenkinsAgent,
            });
            handleFormFieldChange({ name, value });
        },
        [handleFormFieldChange, names.jenkinsSlave.name, recommendedJenkinsAgent, setValue]
    );

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.namespace.name, {
                    required: 'Select a namespace',
                    onChange: onNamespaceChange,
                })}
                label={'Namespace'}
                placeholder={'Select a namespace'}
                control={control}
                errors={errors}
                options={namespaces.map(el => ({ label: el, value: el }))}
            />
        </Grid>
    );
};
