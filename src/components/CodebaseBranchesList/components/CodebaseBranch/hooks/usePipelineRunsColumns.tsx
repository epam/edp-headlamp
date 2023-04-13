import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { MuiCore, pluginLib, React } from '../../../../../plugin.globals';
import { formatFullYear, humanizeDefault } from '../../../../../utils/date/humanize';
import { parsePipelineRunStatus } from '../../../../../utils/parsePipelineRunStatus';
import { createTektonPipelineLink } from '../../../../../utils/url/createTektonPipelineLink';
import { createTektonPipelineRunLink } from '../../../../../utils/url/createTektonPipelineRunLink';
import { HeadlampSimpleTableGetterColumn } from '../../../../HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../StatusIcon';

const { Link } = MuiCore;
const {
    CommonComponents: { HoverInfoLabel },
} = pluginLib;

export const usePipelineRunsColumns = (
    tektonUrlOrigin: string
): HeadlampSimpleTableGetterColumn<PipelineRunKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: resource => {
                    const status = parsePipelineRunStatus(resource);

                    return (
                        <StatusIcon
                            status={status}
                            width={25}
                            customTitle={`Pipeline run status: ${status}`}
                        />
                    );
                },
            },
            {
                label: 'Run',
                getter: resource => {
                    const {
                        metadata: { name, namespace },
                    } = resource;

                    if (!resource?.status?.pipelineSpec?.params?.[0]?.default) {
                        return <>{name}</>;
                    }

                    const pipelineRunLink = createTektonPipelineRunLink(
                        tektonUrlOrigin,
                        namespace,
                        name
                    );

                    return (
                        <>
                            <Link href={pipelineRunLink} target="_blank" rel="noopener">
                                {name}
                            </Link>
                        </>
                    );
                },
            },
            {
                label: 'Pipeline',
                getter: resource => {
                    const {
                        metadata: { namespace },
                        spec: {
                            pipelineRef: { name: pipelineRefName },
                        },
                    } = resource;

                    if (!resource?.status?.pipelineSpec?.params?.[0]?.default) {
                        return <>{pipelineRefName}</>;
                    }

                    const pipelineLink = createTektonPipelineLink(
                        tektonUrlOrigin,
                        namespace,
                        pipelineRefName
                    );

                    return (
                        <>
                            <Link href={pipelineLink} target="_blank" rel="noopener">
                                {pipelineRefName}
                            </Link>
                        </>
                    );
                },
            },
            {
                label: 'Time',
                getter: resource => {
                    if (!resource?.status?.startTime || !resource?.status?.completionTime) {
                        return <HoverInfoLabel label={''} hoverInfo={''} icon="mdi:calendar" />;
                    }

                    const startTimeDate = new Date(resource?.status?.startTime);
                    const completionTimeDate = new Date(resource?.status?.completionTime);
                    const time = humanizeDefault(
                        completionTimeDate.getTime(),
                        startTimeDate.getTime()
                    );

                    return (
                        <HoverInfoLabel
                            label={time}
                            hoverInfo={formatFullYear(startTimeDate)}
                            icon="mdi:calendar"
                        />
                    );
                },
            },
        ],
        [tektonUrlOrigin]
    );
