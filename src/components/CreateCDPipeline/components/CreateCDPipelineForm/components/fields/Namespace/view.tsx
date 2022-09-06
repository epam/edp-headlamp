import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { NamespaceProps } from './types';

const { Grid } = MuiCore;

export const Namespace = ({ names, handleFormFieldChange, namespaces }: NamespaceProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.namespace.name, {
                    required: 'Select the existing namespace',
                    onChange: handleFormFieldChange,
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
