import { ICONS } from '../../../../constants/icons';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
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
    key,
    handlePanelChange,
    codebaseData,
}: CodebaseBranchProps): React.ReactElement => {
    const classes = useStyles();
    const rows = useRows(codebaseBranchData);
    const codebaseBranchLabel = `${codebaseData.metadata.name}-${codebaseBranchData.spec.branchName}`;

    const [latestPipelineRunStatus, setLatestPipelineRunStatus] = React.useState<string>(
        CUSTOM_RESOURCE_STATUSES['UNKNOWN']
    );
    const [, setError] = React.useState<Error>(null);

    const handleStoreLatestPipelineRun = React.useCallback(
        (data: PipelineRunKubeObjectInterface[]) => {
            const [latestPipelineRun] = data.sort(sortKubeObjectByCreationTimestamp);

            if (
                latestPipelineRun &&
                latestPipelineRun.status &&
                latestPipelineRun.status.conditions &&
                latestPipelineRun.status.conditions.length &&
                latestPipelineRun.status.conditions[0].reason !== latestPipelineRunStatus
            ) {
                setLatestPipelineRunStatus(
                    latestPipelineRun.status.conditions[0].reason.toLowerCase()
                );
            } else {
                setLatestPipelineRunStatus(CUSTOM_RESOURCE_STATUSES['UNKNOWN']);
            }
        },
        [latestPipelineRunStatus]
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
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
        codebaseBranchData.metadata.namespace,
    ]);

    return (
        <div style={{ paddingBottom: rem(16) }}>
            <Accordion expanded={expandedPanel === key} onChange={handlePanelChange(key)}>
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
                                <Grid item>
                                    <div className={classes.pipelineRunStatus}>
                                        <StatusIcon
                                            status={latestPipelineRunStatus}
                                            customTitle={`Last pipeline run status: ${latestPipelineRunStatus}`}
                                            width={18}
                                        />
                                    </div>
                                </Grid>
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
