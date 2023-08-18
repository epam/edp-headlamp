import { Icon } from '@iconify/react';
import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../components/DocLink';
import { PageWrapper } from '../../components/PageWrapper';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { FORM_MODES } from '../../types/forms';
import { CDPipelineActionsMenu } from '../../widgets/CDPipelineActionsMenu';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../widgets/CreateEditCDPipeline/constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../../widgets/CreateEditCDPipeline/types';
import { CDPipelineList } from './components/CDPipelineList';

export const PageView = () => {
    const [items, error] = EDPCDPipelineKubeObject.useList();

    const { setDialog } = useDialogContext();

    const createEditCDPipelineDialogForwardedProps: CreateEditCDPipelineDialogForwardedProps =
        React.useMemo(() => ({ mode: FORM_MODES.CREATE }), []);

    return (
        <PageWrapper>
            <SectionBox>
                <SectionFilterHeader
                    // @ts-ignore
                    title={
                        <Grid container alignItems={'center'} spacing={1}>
                            <Grid item>
                                <Typography variant={'h5'}>Environments</Typography>
                            </Grid>
                            <Grid item>
                                <DocLink
                                    href={
                                        EDP_USER_GUIDE.CD_PIPELINE_CREATE.anchors.CREATE_VIA_UI.url
                                    }
                                />
                            </Grid>
                        </Grid>
                    }
                    actions={[
                        <Button
                            startIcon={<Icon icon={ICONS.PLUS} />}
                            color={'primary'}
                            variant={'contained'}
                            onClick={() =>
                                setDialog({
                                    modalName: CREATE_EDIT_CD_PIPELINE_DIALOG_NAME,
                                    forwardedProps: createEditCDPipelineDialogForwardedProps,
                                })
                            }
                        >
                            create
                        </Button>,
                    ]}
                    headerStyle="label"
                />
                <ResourceActionListContextProvider>
                    <CDPipelineList CDPipelines={items} error={error} />
                    <CDPipelineActionsMenu />
                </ResourceActionListContextProvider>
            </SectionBox>
        </PageWrapper>
    );
};
