import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@material-ui/core';
import { CDPipelineActionsMenu } from '../../components/CDPipelineActionsMenu';
import { CreateCDPipeline } from '../../components/CreateCDPipeline';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { DocLink } from '../../components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINES } from '../../constants/urls';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { CDPipelineList } from './components/CDPipelineList';

export const PageView = () => {
    const [items, error] = EDPCDPipelineKubeObject.useList();

    return (
        <SectionBox
            title={
                <SectionFilterHeader
                    // @ts-ignore
                    title={
                        <Grid container alignItems={'center'} spacing={1}>
                            <Grid item>
                                <Typography variant={'h5'}>CD Pipelines</Typography>
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
            <CreateKubeObject>
                <CreateCDPipeline />
            </CreateKubeObject>
        </SectionBox>
    );
};
