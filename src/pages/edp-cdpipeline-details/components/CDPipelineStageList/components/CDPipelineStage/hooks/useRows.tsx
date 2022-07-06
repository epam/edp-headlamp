import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../k8s/EDPCDPipelineStage/types';

const {
    pluginLib: { React },
} = globalThis;

export const useRows = (stage: EDPCDPipelineStageKubeObjectInterface) =>
    React.useMemo(() => {
        const { spec, status } = stage;

        return [
            {
                name: 'Status',
                value: status && status.status,
            },
            {
                name: 'CD Pipeline',
                value: spec.cdPipeline,
            },
            {
                name: 'Description',
                value: spec.description,
            },
            {
                name: 'Job provisioning',
                value: spec.jobProvisioning,
            },
            {
                name: 'Order',
                value: spec.order,
            },
            {
                name: 'Trigger type',
                value: spec.triggerType,
            },
            {
                name: 'Source',
                value: (
                    <>
                        <span>type: {spec.source.type} </span>
                    </>
                ),
            },
        ];
    }, [stage]);
