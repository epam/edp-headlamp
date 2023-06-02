import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { CI_TOOLS } from '../../../../constants/ciTools';
import { ICONS } from '../../../../constants/icons';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { useEDPComponentsURLsQuery } from '../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { parseTektonResourceStatus } from '../../../../utils/parseTektonResourceStatus';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../utils/styling/rem';
import { createSonarLink } from '../../../../utils/url/createSonarLink';
import { FormSelect } from '../../../FormComponents';
import { HeadlampNameValueTable } from '../../../HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../HeadlampSimpleTable';
import { Render } from '../../../Render';
import { ResourceIconLink } from '../../../ResourceIconLink';
import { StatusIcon } from '../../../StatusIcon';
import { isDefaultBranch } from '../../utils';
import { CodebaseBranchActions } from './components/CodebaseBranchActions';
import { useMainInfoRows } from './hooks/useMainInfoRows';
import { usePipelineRunsColumns } from './hooks/usePipelineRunsColumns';
import { useStyles } from './styles';
import { CodebaseBranchProps } from './types';

const { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Chip, Paper } = MuiCore;
const { Icon } = Iconify;

const pipelineRunTypes = Object.entries(PIPELINE_TYPES).filter(
    ([, value]) => value !== PIPELINE_TYPES['DEPLOY']
);
const pipelineRunTypeSelectOptions = pipelineRunTypes.map(([, value]) => ({
    label: capitalizeFirstLetter(value),
    value: value,
}));

export const CodebaseBranch = ({
    defaultBranch,
    codebaseBranchData,
    expandedPanel,
    id,
    handlePanelChange,
    codebaseData,
}: CodebaseBranchProps): React.ReactElement => {
    const {
        register,
        control,
        formState: { errors },
    } = useForm();

    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();

    const {
        spec: { ciTool },
    } = codebaseData;

    const jenkinsCiToolIsUsed = ciTool === CI_TOOLS['JENKINS'];

    const classes = useStyles();
    const mainInfoRows = useMainInfoRows(codebaseBranchData);
    const pipelineRunsColumns = usePipelineRunsColumns();
    const normalizedCodebaseBranchName = codebaseBranchData.metadata.name.replaceAll('/', '-');

    const [pipelineRuns, setPipelineRuns] = React.useState<{
        all: PipelineRunKubeObjectInterface[];
        latestBuildRunStatus: string;
    }>({
        all: null,
        latestBuildRunStatus: CUSTOM_RESOURCE_STATUSES['UNKNOWN'],
    });

    const [, setError] = React.useState<Error>(null);
    const [pipelineRunType, setPipelineRunType] = React.useState<PIPELINE_TYPES>(
        PIPELINE_TYPES['ALL']
    );
    const filteredPipelineRunsByType = React.useMemo(
        () =>
            pipelineRunType === 'all'
                ? pipelineRuns.all
                : pipelineRuns.all.filter(
                      ({ metadata: { labels } }) =>
                          labels['app.edp.epam.com/pipelinetype'] === pipelineRunType
                  ),
        [pipelineRunType, pipelineRuns.all]
    );
    const handleStorePipelineRuns = React.useCallback(
        (socketPipelineRuns: PipelineRunKubeObjectInterface[]) => {
            if (jenkinsCiToolIsUsed) {
                return;
            }

            const sortedPipelineRuns = socketPipelineRuns.sort(sortKubeObjectByCreationTimestamp);

            const [latestBuildPipelineRun] = sortedPipelineRuns;

            if (
                latestBuildPipelineRun?.status?.conditions?.[0]?.reason ===
                pipelineRuns.latestBuildRunStatus
            ) {
                return;
            }

            const pipelineRunStatus = parseTektonResourceStatus(latestBuildPipelineRun);

            setPipelineRuns({
                all: sortedPipelineRuns,
                latestBuildRunStatus: pipelineRunStatus,
            });
        },
        [jenkinsCiToolIsUsed, pipelineRuns.latestBuildRunStatus]
    );

    const handleStreamError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        if (jenkinsCiToolIsUsed) {
            return;
        }

        const cancelStream = PipelineRunKubeObject.streamPipelineRunListByCodebaseBranchLabel({
            namespace: codebaseBranchData.metadata.namespace,
            codebaseBranchLabel: normalizedCodebaseBranchName,
            dataHandler: handleStorePipelineRuns,
            errorHandler: handleStreamError,
        });

        return () => cancelStream();
    }, [
        normalizedCodebaseBranchName,
        handleStreamError,
        handleStorePipelineRuns,
        codebaseBranchData,
        jenkinsCiToolIsUsed,
    ]);

    const status = codebaseBranchData.status
        ? codebaseBranchData.status.status
        : CUSTOM_RESOURCE_STATUSES.UNKNOWN;

    const statusTitle = (
        <>
            <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                {capitalizeFirstLetter(status)}
            </Typography>
            <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                    {codebaseBranchData?.status?.detailedMessage}
                </Typography>
            </Render>
        </>
    );

    const sonarLink = React.useMemo(
        () =>
            EDPComponentsURLS && Object.hasOwn(EDPComponentsURLS, 'sonar')
                ? createSonarLink(EDPComponentsURLS?.sonar, codebaseBranchData.metadata.name)
                : null,
        [codebaseBranchData.metadata.name, EDPComponentsURLS]
    );

    return (
        <div style={{ paddingBottom: rem(16) }}>
            <Accordion expanded={expandedPanel === id} onChange={handlePanelChange(id)}>
                <AccordionSummary expandIcon={<Icon icon={ICONS['ARROW_DOWN']} />}>
                    <div className={classes.branchHeader}>
                        <StatusIcon status={status} customTitle={statusTitle} />
                        <Typography variant={'h6'} style={{ lineHeight: 1, marginTop: rem(2) }}>
                            {codebaseBranchData.spec.branchName}
                        </Typography>
                        <Render condition={isDefaultBranch(codebaseData, codebaseBranchData)}>
                            <Chip
                                label="default"
                                className={clsx([classes.labelChip, classes.labelChipBlue])}
                            />
                        </Render>
                        <Render condition={codebaseBranchData.spec.release}>
                            <Chip
                                label="release"
                                className={clsx([classes.labelChip, classes.labelChipGreen])}
                            />
                        </Render>
                        <div style={{ marginLeft: 'auto' }}>
                            <Grid container spacing={1} alignItems={'center'}>
                                <Render condition={!jenkinsCiToolIsUsed}>
                                    <Grid item>
                                        <div className={classes.pipelineRunStatus}>
                                            <StatusIcon
                                                status={pipelineRuns.latestBuildRunStatus}
                                                customTitle={`Last pipeline run status: ${pipelineRuns.latestBuildRunStatus}`}
                                                width={18}
                                            />
                                        </div>
                                    </Grid>
                                </Render>
                                <Render condition={!!EDPComponentsURLS?.sonar}>
                                    <Grid item>
                                        <ResourceIconLink
                                            tooltipTitle={'Go to the Quality Gates'}
                                            link={sonarLink}
                                            icon={ICONS.SONAR}
                                        />
                                    </Grid>
                                </Render>
                                <Render condition={!!codebaseData?.status?.gitWebUrl}>
                                    <Grid item>
                                        <ResourceIconLink
                                            tooltipTitle={'Go to the Source Code'}
                                            link={codebaseData?.status?.gitWebUrl}
                                            icon={ICONS.GIT_BRANCH}
                                        />
                                    </Grid>
                                </Render>
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
                    <Grid container spacing={3}>
                        <Render condition={!jenkinsCiToolIsUsed}>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Render condition={!!pipelineRuns?.all?.length}>
                                        <Grid item xs={4}>
                                            <FormSelect
                                                {...register('type', {
                                                    onChange: ({ target: { value } }) =>
                                                        setPipelineRunType(value),
                                                })}
                                                control={control}
                                                errors={errors}
                                                name={'type'}
                                                label={'Type'}
                                                options={pipelineRunTypeSelectOptions}
                                                defaultValue={PIPELINE_TYPES['ALL']}
                                            />
                                        </Grid>
                                    </Render>
                                    <Grid item xs={12}>
                                        <Paper>
                                            <HeadlampSimpleTable
                                                columns={pipelineRunsColumns}
                                                data={filteredPipelineRunsByType}
                                                emptyMessage={
                                                    pipelineRunType === PIPELINE_TYPES['ALL']
                                                        ? 'No pipeline runs'
                                                        : `No ${pipelineRunType} pipeline runs`
                                                }
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Render>
                        <Grid item xs={12}>
                            <HeadlampNameValueTable rows={mainInfoRows} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
