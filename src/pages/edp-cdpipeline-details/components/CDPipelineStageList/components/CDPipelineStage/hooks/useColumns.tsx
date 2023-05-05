import { HeadlampSimpleTableGetterColumn } from '../../../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../../../components/StatusIcon';
import { EDPCDPipelineStageSpecQualityGatesInterface } from '../../../../../../../k8s/EDPCDPipelineStage/types';
import { PipelineRunKubeObjectInterface } from '../../../../../../../k8s/PipelineRun/types';
import { React } from '../../../../../../../plugin.globals';

export const useColumns = (): HeadlampSimpleTableGetterColumn<{
    qualityGate: EDPCDPipelineStageSpecQualityGatesInterface;
    autotestPipelineRun: PipelineRunKubeObjectInterface;
}>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ autotestPipelineRun }) => {
                    return (
                        <StatusIcon
                            status={autotestPipelineRun?.status?.conditions?.[0]?.reason?.toLowerCase()}
                        />
                    );
                },
            },
            {
                label: 'Type',
                getter: ({ qualityGate: { qualityGateType } }) => qualityGateType,
            },
            {
                label: 'Step name',
                getter: ({ qualityGate: { stepName } }) => stepName,
            },
            {
                label: 'Autotest name',
                getter: ({ qualityGate: { autotestName } }) => autotestName,
            },
            {
                label: 'Branch name',
                getter: ({ qualityGate: { branchName } }) => branchName,
            },
        ],
        []
    );
