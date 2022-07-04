import { CDPipelineExample } from '../../configs/kube-examples/edp-cdpipeline';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPCDPipelineListProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;

const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPCDPipelineList: React.FC<EDPCDPipelineListProps> = (): React.ReactElement => {
    const [cdpipelines] = EDPCDPipelineKubeObject.useList();

    return (
        <SectionBox title={<SectionFilterHeader title="CD Pipelines" headerStyle="main" />}>
            <FloatingActions
                kubeObject={EDPCDPipelineKubeObject}
                kubeObjectExample={CDPipelineExample}
            />
            <Table data={cdpipelines} />
        </SectionBox>
    );
};
