import { HeadlampSimpleTableGetterColumn } from '../../../../../../../components/HeadlampSimpleTable/types';
import { EDPCDPipelineStageSpecQualityGatesInterface } from '../../../../../../../k8s/EDPCDPipelineStage/types';

const {
    pluginLib: { React },
} = globalThis;

export const useColumns =
    (): HeadlampSimpleTableGetterColumn<EDPCDPipelineStageSpecQualityGatesInterface>[] =>
        React.useMemo(
            () => [
                {
                    label: 'Autotest name',
                    getter: ({ autotestName }) => autotestName,
                },
                {
                    label: 'Branch name',
                    getter: ({ branchName }) => branchName,
                },
                {
                    label: 'Quality gate type',
                    getter: ({ qualityGateType }) => qualityGateType,
                },
                {
                    label: 'Step name',
                    getter: ({ stepName }) => stepName,
                },
            ],
            []
        );
