import { CI_TOOLS } from '../../../../constants/ciTools';
import { ICONS } from '../../../../constants/icons';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { CUSTOM_RESOURCE_STATUSES, PIPELINE_RUN_STATUSES } from '../../../../constants/statuses';
import { streamPipelineRunListByCodebaseBranchLabel } from '../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../utils/styling/rem';
import { HeadlampNameValueTable } from '../../../HeadlampNameValueTable';
import { Render } from '../../../Render';
import { StatusIcon } from '../../../StatusIcon';
import { isDefaultBranch } from '../../utils';
import { CodebaseBranchActions } from '../CodebaseBranchActions';
import { CodebaseBranchMetadataTable } from '../CodebaseBranchMetadataTable';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CodebaseBranchProps } from './types';

const { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } = MuiCore;
const { Icon } = Iconify;

export const CodebaseBranch = ({
    defaultBranch,
    codebaseBranchData,
    expandedPanel,
    id,
    handlePanelChange,
    codebaseData,
}: CodebaseBranchProps): React.ReactElement => {
    const {
        spec: { ciTool },
    } = codebaseData;

    const jenkinsCiToolIsUsed = ciTool === CI_TOOLS['JENKINS'];

    const classes = useStyles();
    const rows = useRows(codebaseBranchData);
    const codebaseBranchLabel = `${codebaseData.metadata.name}-${codebaseBranchData.spec.branchName}`;

    const [latestBuildPipelineRunStatus, setLatestPipelineRunStatus] = React.useState<string>(
        CUSTOM_RESOURCE_STATUSES['UNKNOWN']
    );
    const [, setError] = React.useState<Error>(null);

    const handleStoreLatestPipelineRun = React.useCallback(
        (data: PipelineRunKubeObjectInterface[]) => {
            if (jenkinsCiToolIsUsed) {
                return;
            }

            const [latestBuildPipelineRun] = data
                .filter(
                    ({ metadata: { labels } }) =>
                        labels['app.edp.epam.com/pipelinetype'] === PIPELINE_TYPES['BUILD']
                )
                .sort(sortKubeObjectByCreationTimestamp);

            if (
                latestBuildPipelineRun.status.conditions[0].reason === latestBuildPipelineRunStatus
            ) {
                return;
            }

            if (
                !latestBuildPipelineRun ||
                !latestBuildPipelineRun.status ||
                !latestBuildPipelineRun.status.conditions ||
                !latestBuildPipelineRun.status.conditions.length
            ) {
                setLatestPipelineRunStatus(CUSTOM_RESOURCE_STATUSES['UNKNOWN']);
                return;
            }

            const reasonValue = latestBuildPipelineRun.status.conditions[0].reason.toLowerCase();
            const statusValue = latestBuildPipelineRun.status.conditions[0].status.toLowerCase();

            const currentPipelineRunStatus =
                reasonValue === PIPELINE_RUN_STATUSES['RUNNING']
                    ? reasonValue
                    : statusValue === 'true'
                    ? PIPELINE_RUN_STATUSES['SUCCEEDED']
                    : PIPELINE_RUN_STATUSES['FAILED'];

            setLatestPipelineRunStatus(currentPipelineRunStatus);
        },
        [jenkinsCiToolIsUsed, latestBuildPipelineRunStatus]
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        if (jenkinsCiToolIsUsed) {
            return;
        }

        const cancelStream = streamPipelineRunListByCodebaseBranchLabel(
            codebaseBranchLabel,
            handleStoreLatestPipelineRun,
            handleError,
            codebaseBranchData.metadata.namespace
        );

        return () => cancelStream();
    }, [
        codebaseBranchLabel,
        handleError,
        handleStoreLatestPipelineRun,
        codebaseBranchData,
        jenkinsCiToolIsUsed,
    ]);

    return (
        <div style={{ paddingBottom: rem(16) }}>
            <Accordion expanded={expandedPanel === id} onChange={handlePanelChange(id)}>
                <AccordionSummary expandIcon={<Icon icon={ICONS['ARROW_DOWN']} />}>
                    <div className={classes.branchHeader}>
                        <StatusIcon
                            status={
                                codebaseBranchData.status
                                    ? codebaseBranchData.status.status
                                    : CUSTOM_RESOURCE_STATUSES['UNKNOWN']
                            }
                        />
                        <Typography variant={'h6'} style={{ lineHeight: 1 }}>
                            {codebaseBranchData.spec.branchName}
                        </Typography>
                        <Render condition={isDefaultBranch(codebaseData, codebaseBranchData)}>
                            <Typography variant={'subtitle2'}>default branch</Typography>
                        </Render>
                        <div style={{ marginLeft: 'auto' }}>
                            <Grid container spacing={1} alignItems={'center'}>
                                <Render condition={!jenkinsCiToolIsUsed}>
                                    <Grid item>
                                        <div className={classes.pipelineRunStatus}>
                                            <StatusIcon
                                                status={latestBuildPipelineRunStatus}
                                                customTitle={`Last pipeline run status: ${latestBuildPipelineRunStatus}`}
                                                width={18}
                                            />
                                        </div>
                                    </Grid>
                                </Render>
                                <Grid item>
                                    <CodebaseBranchMetadataTable
                                        codebaseBranchData={codebaseBranchData}
                                    />
                                </Grid>
                                <Grid item>
                                    <CodebaseBranchActions
                                        codebaseBranchData={codebaseBranchData}
                                        defaultBranch={defaultBranch}
                                        codebase={codebaseData}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <HeadlampNameValueTable rows={rows} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
