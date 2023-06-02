import { CDPipelineActionsMenu } from '../../components/CDPipelineActionsMenu';
import { CreateCDPipeline } from '../../components/CreateCDPipeline';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { pluginLib, React } from '../../plugin.globals';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { CDPipelineList } from './components/CDPipelineList';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

export const EDPCDPipelineList = (): React.ReactElement => {
    const [items, error] = EDPCDPipelineKubeObject.useList();

    return (
        <SectionBox title={<SectionFilterHeader title="CD Pipelines" headerStyle="label" />}>
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
