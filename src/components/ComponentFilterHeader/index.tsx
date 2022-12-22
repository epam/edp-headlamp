import { useForm } from 'react-hook-form';
import { codebaseTypeSelectOptions } from '../../configs/select-options/codebaseTypeSelectOptions';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { MuiCore, pluginLib, React, ReactRedux } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';
import { FormSelect, FormTextField } from '../FormComponents';

const {
    CommonComponents: { SectionHeader },
} = pluginLib;

const { useDispatch } = ReactRedux;

const { Box, Grid } = MuiCore;

function setSearchFilter(searchTerms: string) {
    return { type: 'FILTER_SET_SEARCH', search: searchTerms };
}
export default function ComponentFilterHeader({ setType }) {
    const dispatch = useDispatch();

    React.useEffect(
        () => {
            // We don't want the search to be used globally, but we're using Redux with it because
            // this way we manage it the same way as with the other filters.
            return function cleanup() {
                dispatch(setSearchFilter(''));
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    const {
        register,
        control,
        formState: { errors },
    } = useForm();
    return (
        <>
            <SectionHeader
                title={'Components'}
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
                                        defaultValue={CODEBASE_TYPES['APPLICATION']}
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
}
