import { Icon } from '@iconify/react';
import { NameValueTable } from '@kinvolk/headlamp-plugin/lib/components/common';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { EmptyList } from '../../../../../../components/EmptyList';
import { Render } from '../../../../../../components/Render';
import { ResourceIconLink } from '../../../../../../components/ResourceIconLink';
import { StatusIcon } from '../../../../../../components/StatusIcon';
import { Table } from '../../../../../../components/Table';
import { CI_TOOLS } from '../../../../../../constants/ciTools';
import { PIPELINE_TYPES } from '../../../../../../constants/pipelineTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../../constants/statuses';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { EDPCodebaseBranchKubeObject } from '../../../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../k8s/EDPCodebaseBranch/types';
import { useEDPComponentsURLsQuery } from '../../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useGitServerByCodebaseQuery } from '../../../../../../k8s/EDPGitServer/hooks/useGitServerByCodebaseQuery';
import { PipelineRunKubeObject } from '../../../../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../../../../k8s/PipelineRun/constants';
import { useCreateBuildPipelineRun } from '../../../../../../k8s/PipelineRun/hooks/useCreateBuildPipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/PipelineRun/types';
import { useStorageSizeQuery } from '../../../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { GENERATE_URL_SERVICE } from '../../../../../../services/url';
import { capitalizeFirstLetter } from '../../../../../../utils/format/capitalizeFirstLetter';
import { sortKubeObjectByCreationTimestamp } from '../../../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../../../utils/styling/rem';
import { EDPComponentDetailsRouteParams } from '../../../../types';
import { isDefaultBranch } from '../../utils';
import { useMainInfoRows } from './hooks/useMainInfoRows';
import { usePipelineRunsColumns } from './hooks/usePipelineRunsColumns';
import { useStyles } from './styles';
import { CodebaseBranchProps } from './types';

const pipelineRunTypes = Object.entries(PIPELINE_TYPES).filter(
    ([, value]) => value !== PIPELINE_TYPES.DEPLOY && value !== PIPELINE_TYPES.AUTOTEST_RUNNER
);
const pipelineRunTypeSelectOptions = pipelineRunTypes.map(([, value]) => ({
    label: capitalizeFirstLetter(value),
    value: value,
}));

export const CodebaseBranch = ({
    codebaseBranchData,
    expandedPanel,
    id,
    handlePanelChange,
    codebaseData,
}: CodebaseBranchProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useForm();
    const { namespace } = useParams<EDPComponentDetailsRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

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
        latestBuildPipelineRun: PipelineRunKubeObjectInterface;
    }>({
        all: null,
        latestBuildPipelineRun: null,
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
                pipelineRuns.latestBuildPipelineRun?.status?.conditions?.[0]?.reason
            ) {
                return;
            }

            setPipelineRuns({
                all: sortedPipelineRuns,
                latestBuildPipelineRun,
            });
        },
        [jenkinsCiToolIsUsed, pipelineRuns.latestBuildPipelineRun]
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

    const sonarLink = React.useMemo(
        () =>
            GENERATE_URL_SERVICE.createSonarLink(
                EDPComponentsURLS?.sonar,
                codebaseBranchData.metadata.name
            ),
        [codebaseBranchData.metadata.name, EDPComponentsURLS]
    );

    const buttonRef = React.createRef<HTMLButtonElement>();

    const { handleOpenResourceActionListMenu } =
        useResourceActionListContext<EDPCodebaseBranchKubeObjectInterface>();
    const { createBuildPipelineRun } = useCreateBuildPipelineRun({});
    const { data: storageSize } = useStorageSizeQuery(codebaseData);
    const { data: gitServerByCodebase } = useGitServerByCodebaseQuery({
        props: { codebaseGitServer: codebaseData?.spec.gitServer },
    });
    const onBuildButtonClick = React.useCallback(
        async e => {
            e.stopPropagation();

            if (!storageSize) {
                throw new Error(`Trigger template's storage property has not been found`);
            }

            if (!gitServerByCodebase) {
                throw new Error(`Codebase Git Server has not been found`);
            }

            await createBuildPipelineRun({
                namespace: codebaseData.metadata.namespace,
                codebaseBranchData: {
                    codebaseBranchName: codebaseBranchData?.spec.branchName,
                    codebaseBranchMetadataName: codebaseBranchData?.metadata.name,
                },
                codebaseData: {
                    codebaseName: codebaseData.metadata.name,
                    codebaseBuildTool: codebaseData.spec.buildTool,
                    codebaseVersioningType: codebaseData.spec.versioning.type,
                    codebaseType: codebaseData.spec.type,
                    codebaseFramework: codebaseData.spec.framework,
                    codebaseGitUrlPath: codebaseData.spec.gitUrlPath,
                },
                gitServerData: {
                    gitUser: gitServerByCodebase.spec.gitUser,
                    gitHost: gitServerByCodebase.spec.gitHost,
                    gitProvider: gitServerByCodebase.spec.gitProvider,
                    sshPort: gitServerByCodebase.spec.sshPort,
                    nameSshKeySecret: gitServerByCodebase.spec.nameSshKeySecret,
                },
                storageSize: storageSize,
            });
        },
        [codebaseBranchData, codebaseData, createBuildPipelineRun, gitServerByCodebase, storageSize]
    );

    const {
        status: { status, detailedMessage },
    } = codebaseBranchData;

    const [codebaseBranchIcon, codebaseBranchColor, codebaseBranchIsRotating] =
        EDPCodebaseBranchKubeObject.getStatusIcon(status);

    const [lastPipelineRunIcon, lastPipelineRunColor, lastPipelineRunIsRotating] =
        PipelineRunKubeObject.getStatusIcon(
            pipelineRuns.latestBuildPipelineRun?.status?.conditions?.[0]?.status,
            pipelineRuns.latestBuildPipelineRun?.status?.conditions?.[0]?.reason
        );

    return (
        <div style={{ paddingBottom: rem(16) }}>
            <Accordion expanded={expandedPanel === id} onChange={handlePanelChange(id)}>
                <AccordionSummary expandIcon={<Icon icon={ICONS['ARROW_DOWN']} />}>
                    <div className={classes.branchHeader}>
                        <StatusIcon
                            icon={codebaseBranchIcon}
                            color={codebaseBranchColor}
                            isRotating={codebaseBranchIsRotating}
                            Title={
                                <>
                                    <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                        {`Status: ${status || 'Unknown'}`}
                                    </Typography>
                                    <Render condition={status === CUSTOM_RESOURCE_STATUSES.FAILED}>
                                        <Typography
                                            variant={'subtitle2'}
                                            style={{ marginTop: rem(10) }}
                                        >
                                            {detailedMessage}
                                        </Typography>
                                    </Render>
                                </>
                            }
                        />
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
                                                icon={lastPipelineRunIcon}
                                                color={lastPipelineRunColor}
                                                isRotating={lastPipelineRunIsRotating}
                                                width={18}
                                                Title={
                                                    <>
                                                        <Typography
                                                            variant={'subtitle2'}
                                                            style={{ fontWeight: 600 }}
                                                        >
                                                            {`Last Build Pipeline Run Status: ${
                                                                status || 'Unknown'
                                                            }`}
                                                        </Typography>
                                                    </>
                                                }
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
                                <Render condition={ciTool === CI_TOOLS.TEKTON}>
                                    <Grid item>
                                        <Tooltip title={'Trigger build pipeline run'}>
                                            <IconButton
                                                onClick={onBuildButtonClick}
                                                disabled={
                                                    pipelineRuns.latestBuildPipelineRun?.status
                                                        ?.conditions?.[0]?.reason ===
                                                    PIPELINE_RUN_REASON.RUNNING
                                                }
                                            >
                                                <Icon icon={ICONS.PLAY} />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Render>

                                <Grid item>
                                    <Tooltip title={'Actions'}>
                                        <IconButton
                                            aria-label={'Actions'}
                                            ref={buttonRef}
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleOpenResourceActionListMenu(
                                                    buttonRef.current,
                                                    codebaseBranchData
                                                );
                                            }}
                                        >
                                            <Icon
                                                icon={ICONS.THREE_DOTS}
                                                color={'grey'}
                                                width="20"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={5}>
                        <Render condition={!jenkinsCiToolIsUsed}>
                            <Grid item xs={12}>
                                <Grid container spacing={5}>
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
                                                defaultValue={PIPELINE_TYPES.ALL}
                                            />
                                        </Grid>
                                    </Render>
                                    <Grid item xs={12}>
                                        <Table
                                            columns={pipelineRunsColumns}
                                            data={filteredPipelineRunsByType}
                                            isLoading={pipelineRuns.all === null}
                                            emptyListComponent={
                                                <EmptyList
                                                    missingItemName={
                                                        pipelineRunType === PIPELINE_TYPES.ALL
                                                            ? 'pipeline runs'
                                                            : `${pipelineRunType} pipeline runs`
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Render>
                        <Grid item xs={12}>
                            <NameValueTable rows={mainInfoRows} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
