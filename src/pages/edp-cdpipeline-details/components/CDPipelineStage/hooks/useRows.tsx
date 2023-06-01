import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { React } from '../../../../../plugin.globals';
import { DeepPartial } from '../../../../../types/global';

export const useRows = (stage: DeepPartial<EDPCDPipelineStageKubeObjectInterface>) =>
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
                value: String(spec.order),
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
