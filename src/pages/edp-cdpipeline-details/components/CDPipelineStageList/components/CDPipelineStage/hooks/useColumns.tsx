import { HeadlampSimpleTableGetterColumn } from '../../../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../../../components/StatusIcon';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../../../constants/statuses';
import { EDPCDPipelineStageSpecQualityGatesInterface } from '../../../../../../../k8s/EDPCDPipelineStage/types';
import { React } from '../../../../../../../plugin.globals';

export const useColumns =
    (): HeadlampSimpleTableGetterColumn<EDPCDPipelineStageSpecQualityGatesInterface>[] =>
        React.useMemo(
            () => [
                {
                    label: 'Status',
                    getter: () => <StatusIcon status={CUSTOM_RESOURCE_STATUSES.UNKNOWN} />,
                },
                {
                    label: 'Type',
                    getter: ({ qualityGateType }) => qualityGateType,
                },
                {
                    label: 'Step name',
                    getter: ({ stepName }) => stepName,
                },
                {
                    label: 'Autotest name',
                    getter: ({ autotestName }) => autotestName,
                },
                {
                    label: 'Branch name',
                    getter: ({ branchName }) => branchName,
                },
            ],
            []
        );
