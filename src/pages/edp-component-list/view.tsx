import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { DocLink } from '../../components/DocLink';
import { PageWrapper } from '../../components/PageWrapper';
import { codebaseTypeSelectOptions } from '../../configs/select-options/codebaseTypeSelectOptions';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { URL_EDP_HEADLAMP_USER_GUIDE_APPLICATIONS } from '../../constants/urls';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { FormSelect } from '../../providers/Form/components/FormSelect';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { rem } from '../../utils/styling/rem';
import { CodebaseActionsMenu } from '../../widgets/CodebaseActionsMenu';
import { CreateCodebase } from '../../widgets/CreateCodebase';
import { ComponentList } from './components/ComponentList';

export const PageView = () => {
    const [type, setType] = React.useState<CODEBASE_TYPES>(CODEBASE_TYPES.ALL);
    const [items, error] = EDPCodebaseKubeObject.useList();

    const {
        register,
        control,
        formState: { errors },
    } = useForm();

    const filteredComponents = React.useMemo(
        () => (type !== CODEBASE_TYPES.ALL ? items.filter(el => el.spec.type === type) : items),
        [items, type]
    );

    return (
        <PageWrapper>
            <SectionBox
                title={
                    <SectionFilterHeader
                        // @ts-ignore
                        title={
                            <Grid container alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <Typography variant={'h5'}>Components</Typography>
                                </Grid>
                                <Grid item>
                                    <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_APPLICATIONS} />
                                </Grid>
                            </Grid>
                        }
                        headerStyle={'label'}
                        actions={[
                            <Box>
                                <Grid container spacing={1}>
                                    <Grid item style={{ minWidth: rem(200), marginBottom: rem(6) }}>
                                        <FormSelect
                                            {...register('type', {
                                                onChange: ({ target: { value } }) => setType(value),
                                            })}
                                            control={control}
                                            errors={errors}
                                            name={'type'}
                                            label={'Type'}
                                            options={codebaseTypeSelectOptions}
                                            defaultValue={CODEBASE_TYPES.ALL}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>,
                        ]}
                    />
                }
            >
                <ResourceActionListContextProvider>
                    <ComponentList components={filteredComponents} error={error} />
                    <CodebaseActionsMenu />
                </ResourceActionListContextProvider>
                <CreateKubeObject>
                    <CreateCodebase />
                </CreateKubeObject>
            </SectionBox>
        </PageWrapper>
    );
};
