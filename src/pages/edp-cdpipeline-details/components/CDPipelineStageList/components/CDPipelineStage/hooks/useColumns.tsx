import { HeadlampSimpleTableGetterColumn } from '../../../../../../../components/HeadlampSimpleTable/types';
import { EDPCDPipelineStageSpecQualityGatesInterface } from '../../../../../../../k8s/EDPCDPipelineStage/types';
import { React } from '../../../../../../../plugin.globals';

export const useColumns =
    (): HeadlampSimpleTableGetterColumn<EDPCDPipelineStageSpecQualityGatesInterface>[] =>
        React.useMemo(
            () => [
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
