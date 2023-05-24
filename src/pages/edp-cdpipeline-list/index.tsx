import { CDPipelineList } from '../../components/CDPipelineList';
import { CreateCDPipeline } from '../../components/CreateCDPipeline';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { pluginLib, React } from '../../plugin.globals';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

export const EDPCDPipelineList = (): React.ReactElement => {
    const [items, error] = EDPCDPipelineKubeObject.useList();

    return (
        <SectionBox title={<SectionFilterHeader title="CD Pipelines" headerStyle="label" />}>
            <CDPipelineList CDPipelines={items} error={error} />
            <CreateKubeObject>
                <CreateCDPipeline />
            </CreateKubeObject>
        </SectionBox>
    );
};
