import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormTextField } from '../../../../../../FormComponents/FormTextField';
import { CommitMessagePatternProps } from './types';

const { Grid } = MuiCore;

export const CommitMessagePattern = ({
    names,
    handleFormFieldChange,
}: CommitMessagePatternProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.commitMessagePattern.name, {
                    required: 'Specify the pattern to validate a commit message',
                    onBlur: handleFormFieldChange,
                })}
                label={'Specify the pattern to validate a commit message'}
                title={'Specify the pattern to validate a commit message'}
                placeholder={`^\[PROJECT_NAME-\d{4}\]:.*$`}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
