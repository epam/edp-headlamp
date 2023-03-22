import { CreateGitServer } from '../../components/CreateGitServer';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { pluginLib, React } from '../../plugin.globals';
import { GitServerList } from './components/GitServerList';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

export const EDPGitServerList = (): React.ReactElement => {
    const [items, error] = EDPGitServerKubeObject.useList();

    return (
        <SectionBox title={<SectionFilterHeader title="Git Servers" headerStyle="label" />}>
            <CreateKubeObject>
                <CreateGitServer />
            </CreateKubeObject>
            <GitServerList gitServers={items} error={error} />
        </SectionBox>
    );
};
