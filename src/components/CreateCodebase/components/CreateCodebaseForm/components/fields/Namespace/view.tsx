import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { getRecommendedJenkinsAgent } from '../../../utils';
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
