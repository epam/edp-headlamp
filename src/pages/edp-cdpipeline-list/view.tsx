import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../components/DocLink';
import { PageWrapper } from '../../components/PageWrapper';
import { URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINES } from '../../constants/urls';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { CreateResourceFab } from '../../providers/Dialog/components/CreateResourceFab';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { FORM_MODES } from '../../types/forms';
import { CDPipelineActionsMenu } from '../../widgets/CDPipelineActionsMenu';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../widgets/CreateEditCDPipeline/constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../../widgets/CreateEditCDPipeline/types';
import { CDPipelineList } from './components/CDPipelineList';

export const PageView = () => {
    const [items, error] = EDPCDPipelineKubeObject.useList();

    const createEditCDPipelineDialogForwardedProps: CreateEditCDPipelineDialogForwardedProps =
        React.useMemo(() => ({ mode: FORM_MODES.CREATE }), []);

    return (
        <PageWrapper>
            <SectionBox
                title={
                    <SectionFilterHeader
                        // @ts-ignore
                        title={
                            <Grid container alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <Typography variant={'h5'}>Environments</Typography>
                                </Grid>
                                <Grid item>
                                    <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINES} />
                                </Grid>
                            </Grid>
                        }
                        headerStyle="label"
                    />
                }
            >
                <ResourceActionListContextProvider>
                    <CDPipelineList CDPipelines={items} error={error} />
                    <CDPipelineActionsMenu />
                </ResourceActionListContextProvider>
                <CreateResourceFab
                    modalName={CREATE_EDIT_CD_PIPELINE_DIALOG_NAME}
                    forwardedProps={createEditCDPipelineDialogForwardedProps}
                />
            </SectionBox>
        </PageWrapper>
    );
};
