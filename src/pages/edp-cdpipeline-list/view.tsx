import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { DocLink } from '../../components/DocLink';
import { EmptyList } from '../../components/EmptyList';
import { PageWrapper } from '../../components/PageWrapper';
import { Render } from '../../components/Render';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE } from '../../k8s/EDPCodebase/labels';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { FORM_MODES } from '../../types/forms';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { CDPipelineActionsMenu } from '../../widgets/CDPipelineActionsMenu';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../widgets/CreateEditCDPipeline/constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../../widgets/CreateEditCDPipeline/types';
import { routeEDPGitOpsConfiguration } from '../edp-configuration/pages/edp-gitops/route';
import { CDPipelineList } from './components/CDPipelineList';

export const PageView = () => {
    const [codebases] = EDPCodebaseKubeObject.useList({
        namespace: getDefaultNamespace(),
        labelSelector: `${CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE}=${CODEBASE_TYPES.SYSTEM}`,
    });

    const codebasesArray = React.useMemo(
        () => (codebases ? codebases.filter(Boolean) : []),
        [codebases]
    );

    const gitOpsCodebase = codebasesArray.find(el => el.metadata.name === 'edp-gitops') ?? null;
    const [items, error] = EDPCDPipelineKubeObject.useList();

    const { setDialog } = useDialogContext();

    const createEditCDPipelineDialogForwardedProps: CreateEditCDPipelineDialogForwardedProps =
        React.useMemo(() => ({ mode: FORM_MODES.CREATE }), []);

    const history = useHistory();

    const gitOpsConfigurationPageRoute = Router.createRouteURL(routeEDPGitOpsConfiguration.path);

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
                            disabled={!gitOpsCodebase}
                        >
                            create
                        </Button>,
                    ]}
                    headerStyle="label"
                />
                <ResourceActionListContextProvider>
                    <Render condition={!!gitOpsCodebase}>
                        <CDPipelineList CDPipelines={items} error={error} />
                    </Render>
                    <Render condition={!gitOpsCodebase}>
                        <EmptyList
                            customText={'GitOps Repository Configuration Required:'}
                            linkText={'Click here to initiate the setup process.'}
                            handleClick={() => history.push(gitOpsConfigurationPageRoute)}
                        />
                    </Render>
                    <CDPipelineActionsMenu />
                </ResourceActionListContextProvider>
            </SectionBox>
        </PageWrapper>
    );
};
