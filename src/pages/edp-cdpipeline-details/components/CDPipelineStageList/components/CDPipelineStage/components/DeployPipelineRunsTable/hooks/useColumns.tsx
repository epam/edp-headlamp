import { HeadlampSimpleTableGetterColumn } from '../../../../../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../../../../../components/StatusIcon';
import { PIPELINE_RUN_STATUSES } from '../../../../../../../../../constants/statuses';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../../k8s/PipelineRun/types';
import { React } from '../../../../../../../../../plugin.globals';
import { formatDateToDuration } from '../../../../../../../../../utils/format/formatDateToDuration';
import { formatDateUTCToLocal } from '../../../../../../../../../utils/format/formatDateUTCToLocal';

export const useColumns = (): HeadlampSimpleTableGetterColumn<PipelineRunKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status }) => {
                    const reasonValue = status?.conditions[0]?.reason.toLowerCase();
                    const statusValue = status?.conditions[0]?.status.toLowerCase();

                    const currentPipelineRunStatus =
                        reasonValue === PIPELINE_RUN_STATUSES['RUNNING']
                            ? reasonValue
                            : statusValue === 'true'
                            ? PIPELINE_RUN_STATUSES['SUCCEEDED']
                            : PIPELINE_RUN_STATUSES['FAILED'];

                    return <StatusIcon status={currentPipelineRunStatus} />;
                },
            },
            {
                label: 'Name',
                getter: ({ metadata: { name } }) => name,
            },
            {
                label: 'Start time',
                getter: ({ status }) => formatDateUTCToLocal(status?.startTime),
            },
            {
                label: 'Duration',
                getter: ({ status }) =>
                    formatDateToDuration(status?.startTime, status?.completionTime),
            },
        ],
        []
    );
