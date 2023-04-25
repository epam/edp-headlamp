import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { GitServersDataContext } from '../../../CreateCodebase';
import { FormSelect } from '../../../FormComponents';
import { GitServerProps } from './types';

export const GitServer = ({ names, handleFormFieldChange }: GitServerProps) => {
    const gitServers = React.useContext(GitServersDataContext);
    const gitServersOptions = React.useMemo(
        () =>
            gitServers
                ? gitServers.map(({ metadata: { name } }) => ({ label: name, value: name }))
                : [],
        [gitServers]
    );

    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormSelect
            {...register(names.gitServer.name, {
                required: 'Select an existing Git server',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Git server'}
            title={'Select an existing Git server'}
            control={control}
            errors={errors}
            options={gitServersOptions}
        />
    );
};
