import { CreateGitServer } from '../../components/CreateGitServer';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { streamGitServers } from '../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { pluginLib, React, ReactRouter } from '../../plugin.globals';
import { GitServerList } from './components/GitServerList';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

const { useParams } = ReactRouter;

export const EDPGitServerList = (): React.ReactElement => {
    const { namespace } = useParams();
    const [gitServers, setGitServers] = React.useState<EDPGitServerKubeObjectInterface[]>([]);
    const [, setError] = React.useState<Error>(null);

    const handleStoreGitServers = React.useCallback(
        (gitServers: EDPGitServerKubeObjectInterface[]) => {
            setGitServers(gitServers);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamGitServers(handleStoreGitServers, handleError, namespace);

        return () => cancelStream();
    }, [handleError, handleStoreGitServers, namespace]);

    return (
        <SectionBox title={<SectionFilterHeader title="Git Servers" headerStyle="main" />}>
            <CreateKubeObject>
                <CreateGitServer />
            </CreateKubeObject>
            <GitServerList gitServers={gitServers} />
        </SectionBox>
    );
};
