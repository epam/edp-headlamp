import { CreateGitServer } from '../../components/CreateGitServer';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { useNamespace } from '../../hooks/useNamespace';
import { streamGitServers } from '../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { pluginLib, React } from '../../plugin.globals';
import { GitServerList } from './components/GitServerList';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

export const EDPGitServerList = (): React.ReactElement => {
    const { namespace } = useNamespace();
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
        <SectionBox
            title={
                <SectionFilterHeader title="Git Servers" headerStyle="label" noNamespaceFilter />
            }
        >
            <CreateKubeObject>
                <CreateGitServer />
            </CreateKubeObject>
            <GitServerList gitServers={gitServers} />
        </SectionBox>
    );
};
