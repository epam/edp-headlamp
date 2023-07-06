import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { Render } from '../../components/Render';
import { streamGitServer } from '../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { routeEDPGitServerList } from '../edp-gitserver-list/route';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { GitServerMetadataTable } from './components/GItServerMetadataTable';
import { EDPGitServerDetailsRouteParams } from './types';

export const PageView = () => {
    const { namespace, name } = useParams<EDPGitServerDetailsRouteParams>();
    const [gitServer, setGitServer] = React.useState<EDPGitServerKubeObjectInterface>(null);
    const [, setError] = React.useState<Error>(null);

    const handleStoreApplication = React.useCallback(
        (gitServer: EDPGitServerKubeObjectInterface) => {
            setGitServer(gitServer);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamGitServer(name, namespace, handleStoreApplication, handleError);

        return () => cancelStream();
    }, [handleError, handleStoreApplication, name, namespace]);

    return (
        <PageWrapper
            breadcrumbs={[
                {
                    label: 'Git Servers',
                    url: {
                        pathname: routeEDPGitServerList.path,
                    },
                },
                {
                    label: name,
                },
            ]}
            headerSlot={
                <div style={{ marginLeft: 'auto' }}>
                    <Render condition={!!gitServer}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <GitServerMetadataTable gitServerData={gitServer} />
                            </Grid>
                        </Grid>
                    </Render>
                </div>
            }
        >
            <Render condition={!!gitServer}>
                <GeneralInfoTable gitServerData={gitServer} />
            </Render>
        </PageWrapper>
    );
};
