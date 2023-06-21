import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@material-ui/core';
import { CreateGitServer } from '../../components/CreateGitServer';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { DocLink } from '../../components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVERS } from '../../constants/urls';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { React } from '../../plugin.globals';
import { GitServerList } from './components/GitServerList';

export const PageView = () => {
    const [items, error] = EDPGitServerKubeObject.useList();

    return (
        <SectionBox
            title={
                <SectionFilterHeader
                    // @ts-ignore
                    title={
                        <Grid container alignItems={'center'} spacing={1}>
                            <Grid item>
                                <Typography variant={'h5'}>Git Servers</Typography>
                            </Grid>
                            <Grid item>
                                <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVERS} />
                            </Grid>
                        </Grid>
                    }
                    headerStyle="label"
                />
            }
        >
            <GitServerList gitServers={items} error={error} />
            <CreateKubeObject>
                <CreateGitServer />
            </CreateKubeObject>
        </SectionBox>
    );
};
