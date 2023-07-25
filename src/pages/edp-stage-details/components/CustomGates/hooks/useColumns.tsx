import { Link as MuiLink } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { GENERATE_URL_SERVICE } from '../../../../../services/url';
import { formatDateToDuration } from '../../../../../utils/format/formatDateToDuration';
import { formatDateUTCToLocal } from '../../../../../utils/format/formatDateUTCToLocal';
import { parseTektonResourceStatus } from '../../../../../utils/parseTektonResourceStatus';
import { EDPStageDetailsRouteParams } from '../../../types';

export const useColumns = (): HeadlampSimpleTableGetterColumn<PipelineRunKubeObjectInterface>[] => {
    const { namespace } = useParams<EDPStageDetailsRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

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
                        href={GENERATE_URL_SERVICE.createTektonPipelineRunLink(
                            EDPComponentsURLS?.tekton,
                            namespace,
                            name
                        )}
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
