import { useForm } from 'react-hook-form';
import { FormSelect, FormTextField } from '../../../../components/FormComponents';
import { codebaseTypeSelectOptions } from '../../../../configs/select-options/codebaseTypeSelectOptions';
import { MuiCore, pluginLib, React, ReactRedux } from '../../../../plugin.globals';
import { rem } from '../../../../utils/styling/rem';
import { ComponentFilterHeaderProps } from './types';

const {
    CommonComponents: { SectionHeader },
} = pluginLib;

const { useDispatch } = ReactRedux;

const { Box, Grid } = MuiCore;

function setSearchFilter(searchTerms: string) {
    return { type: 'FILTER_SET_SEARCH', search: searchTerms };
}
export const ComponentFilterHeader = ({
    setType,
    defaultValues,
}: ComponentFilterHeaderProps): React.ReactElement => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        return function cleanup() {
            dispatch(setSearchFilter(''));
        };
    }, [dispatch]);

    const {
        register,
        control,
        formState: { errors },
    } = useForm();

    return (
        <>
            <SectionHeader
                title={'Components'}
                headerStyle={'label'}
                actions={[
                    <form>
                        <Box>
                            <Grid container spacing={1}>
                                <Grid item style={{ minWidth: rem(200) }}>
                                    <FormSelect
                                        {...register('type', {
                                            onChange: ({ target: { value } }) => setType(value),
                                        })}
                                        control={control}
                                        errors={errors}
                                        name={'type'}
                                        label={'Type'}
                                        options={codebaseTypeSelectOptions}
                                        defaultValue={defaultValues.type}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormTextField
                                        {...register('search', {
                                            onChange: ({ target: { value } }) => {
                                                dispatch(setSearchFilter(value));
                                            },
                                        })}
                                        control={control}
                                        errors={errors}
                                        label={'Search'}
                                        placeholder={'Filter'}
                                        InputProps={{ role: 'search', type: 'search' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </form>,
                ]}
            />
        </>
    );
};
