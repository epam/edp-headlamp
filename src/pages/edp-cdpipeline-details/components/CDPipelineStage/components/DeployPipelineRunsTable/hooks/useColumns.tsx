import { HeadlampSimpleTableGetterColumn } from '../../../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../../../components/StatusIcon';
import { useEDPComponentsURLsQuery } from '../../../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObjectInterface } from '../../../../../../../k8s/PipelineRun/types';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { formatDateToDuration } from '../../../../../../../utils/format/formatDateToDuration';
import { formatDateUTCToLocal } from '../../../../../../../utils/format/formatDateUTCToLocal';
import { parseTektonResourceStatus } from '../../../../../../../utils/parseTektonResourceStatus';
import { createTektonPipelineRunLink } from '../../../../../../../utils/url/createTektonPipelineRunLink';

const { Link: MuiLink } = MuiCore;

export const useColumns = (): HeadlampSimpleTableGetterColumn<PipelineRunKubeObjectInterface>[] => {
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();

    return React.useMemo(
        () => [
            {
                label: 'Status',
                getter: pipelineRun => {
                    return <StatusIcon status={parseTektonResourceStatus(pipelineRun)} />;
                },
            },
            {
                label: 'Name',
                getter: ({ metadata: { name, namespace } }) => (
                    <MuiLink
                        href={createTektonPipelineRunLink(EDPComponentsURLS, namespace, name)}
                        target={'_blank'}
                    >
                        {name}
                    </MuiLink>
                ),
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
        [EDPComponentsURLS]
    );
};
