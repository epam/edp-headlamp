import { useFormContext } from 'react-hook-form';
import { ICON_BUCKET } from '../../../../../../../../../constants/icons';
import { Iconify, MuiCore, MuiStyles, React } from '../../../../../../../../../plugin.globals';
import { FormTextField } from '../../../../../../../../FormComponents/FormTextField';
import { createAdvancedMappingRowName } from '../../constants';
import { AdvancedJiraMappingRowProps } from './types';

const { Grid, FormControl, TextField, Button } = MuiCore;
const { Icon } = Iconify;
const { useTheme } = MuiStyles;

export const AdvancedJiraMappingRow = ({
    label,
    value,
    handleDeleteMappingRow,
    onChangeJiraPattern,
}: AdvancedJiraMappingRowProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const theme: DefaultTheme = useTheme();

    return (
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <TextField disabled value={label} />
                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <FormTextField
                            {...register(createAdvancedMappingRowName(value), {
                                required: 'Enter Jira Pattern',
                                onBlur: event => onChangeJiraPattern(event, value),
                            })}
                            placeholder={`Enter Jira Pattern`}
                            control={control}
                            errors={errors}
                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                    }}
                >
                    <Button
                        type={'button'}
                        size={'small'}
                        component={'button'}
                        style={{ minWidth: 0 }}
                        onClick={() => handleDeleteMappingRow(value)}
                    >
                        <Icon icon={ICON_BUCKET} width={20} color={theme.palette.grey['500']} />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
