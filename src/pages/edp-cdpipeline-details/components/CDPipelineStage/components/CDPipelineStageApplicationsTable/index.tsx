import { FormProvider, useForm } from 'react-hook-form';
import { Render } from '../../../../../../components/Render';
import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../../../../../../configs/codebase-mappings';
import { useCreateArgoApplication } from '../../../../../../k8s/Application/hooks/useCreateArgoApplication';
import { useGitServerListQuery } from '../../../../../../k8s/EDPGitServer/hooks/useGitServerListQuery';
import { MuiCore, React } from '../../../../../../plugin.globals';
import { useCDPipelineContext } from '../../../../providers/CDPipeline/hooks';
import { useCDPipelineStageContext } from '../../../../providers/CDPipelineStage/hooks';
import { EnrichedApplicationWithArgoApplication } from '../../types';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';

const parseTagLabelValue = (tag: string) => {
    if (tag.includes('::')) {
        const [label, value] = tag.split('::');
        return { value, label };
    } else {
        return { value: tag, label: undefined };
    }
};

const {
    Table,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    Checkbox,
    Typography,
    Grid,
    Button,
    Tooltip,
} = MuiCore;
export const CDPipelineStageApplicationsTable = ({
    enrichedApplicationsWithArgoApplications,
    qualityGatePipelineIsRunning,
}: {
    enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[];
    qualityGatePipelineIsRunning: boolean;
}): React.ReactElement => {
    const { CDPipeline } = useCDPipelineContext();
    const { stage } = useCDPipelineStageContext();
    const { data: gitServers } = useGitServerListQuery({});

    const classes = useStyles();

    const methods = useForm();
    const { getValues, setValue, reset, resetField, trigger } = methods;
    const [selected, setSelected] = React.useState<string[]>([]);

    const handleSelectAllClick = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const newSelected = enrichedApplicationsWithArgoApplications.map(
                    ({
                        application: {
                            metadata: { name },
                        },
                    }) => name
                );
                setSelected(newSelected);
                return;
            }
            setSelected([]);
        },
        [enrichedApplicationsWithArgoApplications]
    );

    const handleRowClick = React.useCallback(
        (event: React.MouseEvent<unknown>, name: string) => {
            const selectedIndex = selected.indexOf(name);
            let newSelected: string[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1)
                );
            }

            setSelected(newSelected);
        },
        [selected]
    );

    const columns = useColumns(qualityGatePipelineIsRunning, handleRowClick, selected);

    const numSelected = React.useMemo(() => selected.length, [selected]);
    const rowCount = React.useMemo(
        () =>
            enrichedApplicationsWithArgoApplications &&
            enrichedApplicationsWithArgoApplications.length,
        [enrichedApplicationsWithArgoApplications]
    );
    const isSelected = React.useCallback(
        (name: string) => selected.indexOf(name) !== -1,
        [selected]
    );

    const enrichedApplicationsByApplicationName = React.useMemo(() => {
        return (
            enrichedApplicationsWithArgoApplications &&
            enrichedApplicationsWithArgoApplications.reduce((acc, cur) => {
                acc.set(cur.application.metadata.name, cur);
                return acc;
            }, new Map<string, EnrichedApplicationWithArgoApplication>())
        );
    }, [enrichedApplicationsWithArgoApplications]);

    const onLatestClick = React.useCallback(() => {
        for (const selectedApplication of selected) {
            const selectFieldName = `image-tag-${selectedApplication}`;
            resetField(selectFieldName);

            const imageStreamBySelectedApplication =
                enrichedApplicationsByApplicationName.get(
                    selectedApplication
                )?.applicationImageStream;

            if (
                !imageStreamBySelectedApplication ||
                !imageStreamBySelectedApplication?.spec?.tags?.length
            ) {
                continue;
            }

            const imageStreamTag = imageStreamBySelectedApplication?.spec?.tags.at(-1).name;

            if (!imageStreamTag) {
                continue;
            }

            setValue(selectFieldName, `latest::${imageStreamTag}`, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [enrichedApplicationsByApplicationName, resetField, selected, setValue]);

    const onStableClick = React.useCallback(() => {
        for (const selectedApplication of selected) {
            const selectFieldName = `image-tag-${selectedApplication}`;
            resetField(selectFieldName);

            const imageStreamBySelectedApplication =
                enrichedApplicationsByApplicationName.get(
                    selectedApplication
                )?.applicationVerifiedImageStream;

            if (
                !imageStreamBySelectedApplication ||
                !imageStreamBySelectedApplication?.spec?.tags?.length
            ) {
                continue;
            }

            const imageStreamTag = imageStreamBySelectedApplication?.spec?.tags.at(-1).name;

            if (!imageStreamTag) {
                continue;
            }

            setValue(selectFieldName, `stable::${imageStreamTag}`, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [enrichedApplicationsByApplicationName, resetField, selected, setValue]);

    const buttonsEnabledMap: {
        deploy: boolean;
        update: boolean;
        uninstall: boolean;
    } = React.useMemo(() => {
        if (!selected || !selected.length) {
            return null;
        }

        const map = selected.reduce(
            (acc, selectedApplication) => {
                {
                    const application =
                        enrichedApplicationsByApplicationName.get(selectedApplication)?.application;
                    const argoApplicationBySelectedApplication =
                        enrichedApplicationsByApplicationName.get(
                            selectedApplication
                        )?.argoApplication;

                    if (!argoApplicationBySelectedApplication) {
                        acc.set(selectedApplication, {
                            deploy: true,
                            update: false,
                            uninstall: false,
                        });
                        return acc;
                    }

                    const isHelm =
                        application?.spec?.lang === CODEBASE_COMMON_LANGUAGES.HELM &&
                        application?.spec?.framework === CODEBASE_COMMON_FRAMEWORKS.HELM &&
                        application?.spec?.buildTool === CODEBASE_COMMON_BUILD_TOOLS.HELM;

                    const deployedVersion = !isHelm
                        ? argoApplicationBySelectedApplication?.spec?.source?.helm?.parameters?.find(
                              el => el.name === 'image.tag'
                          )?.value
                        : argoApplicationBySelectedApplication?.spec?.source?.targetRevision;

                    acc.set(selectedApplication, {
                        deploy: !deployedVersion,
                        update: !!deployedVersion,
                        uninstall: !!deployedVersion,
                    });
                    return acc;
                }
            },
            new Map<
                string,
                {
                    deploy: boolean;
                    update: boolean;
                    uninstall: boolean;
                }
            >()
        );

        const getDeployBoolean = () => {
            for (const [, value] of map) {
                if (!value.deploy) {
                    return false;
                }
            }

            return true;
        };

        const getUpdateBoolean = () => {
            for (const [, value] of map) {
                if (!value.update) {
                    return false;
                }
            }

            return true;
        };

        const getUninstallBoolean = () => {
            for (const [, value] of map) {
                if (!value.uninstall) {
                    return false;
                }
            }

            return true;
        };

        return {
            deploy: getDeployBoolean(),
            update: getUpdateBoolean(),
            uninstall: getUninstallBoolean(),
        };
    }, [enrichedApplicationsByApplicationName, selected]);

    const {
        createArgoApplication,
        editArgoApplication,
        deleteArgoApplication,
        mutations: {
            argoApplicationCreateMutation,
            argoApplicationEditMutation,
            argoApplicationDeleteMutation,
        },
    } = useCreateArgoApplication();

    const someArgoApplicationMutationIsLoading = React.useMemo(
        () =>
            argoApplicationCreateMutation.isLoading ||
            argoApplicationEditMutation.isLoading ||
            argoApplicationDeleteMutation.isLoading,
        [argoApplicationCreateMutation, argoApplicationEditMutation, argoApplicationDeleteMutation]
    );

    const onDeployClick = React.useCallback(async () => {
        const values = getValues();
        const valid = await trigger();

        if (!valid) {
            return;
        }

        for (const [key, value] of Object.entries(values)) {
            const appName = key.replace('image-tag-', '');

            if (!selected.includes(appName)) {
                continue;
            }

            const { value: tagValue, label: tagLabel } = parseTagLabelValue(value);
            const application = enrichedApplicationsByApplicationName.get(appName)?.application;
            const applicationImageStream =
                enrichedApplicationsByApplicationName.get(appName)?.applicationImageStream;
            const applicationVerifiedImageStream =
                enrichedApplicationsByApplicationName.get(appName)?.applicationVerifiedImageStream;

            await createArgoApplication({
                gitServers: gitServers?.items,
                CDPipeline,
                currentCDPipelineStage: stage,
                application,
                imageStream:
                    tagLabel === 'stable' ? applicationVerifiedImageStream : applicationImageStream,
                imageTag: tagValue,
            });
        }
    }, [
        CDPipeline,
        createArgoApplication,
        enrichedApplicationsByApplicationName,
        getValues,
        gitServers?.items,
        selected,
        stage,
        trigger,
    ]);

    const onUpdateClick = React.useCallback(async () => {
        const values = getValues();
        const valid = await trigger();

        if (!valid) {
            return;
        }

        for (const [key, value] of Object.entries(values)) {
            const appName = key.replace('image-tag-', '');

            if (!selected.includes(appName)) {
                continue;
            }

            const { value: tagValue } = parseTagLabelValue(value);
            const application = enrichedApplicationsByApplicationName.get(appName)?.application;
            const argoApplication =
                enrichedApplicationsByApplicationName.get(appName)?.argoApplication;

            await editArgoApplication({
                argoApplication,
                application,
                imageTag: tagValue,
            });
        }
    }, [editArgoApplication, enrichedApplicationsByApplicationName, getValues, selected, trigger]);

    const onUninstallClick = React.useCallback(async () => {
        const values = getValues();

        for (const [key] of Object.entries(values)) {
            const appName = key.replace('image-tag-', '');

            if (!selected.includes(appName)) {
                continue;
            }

            const argoApplication =
                enrichedApplicationsByApplicationName.get(appName)?.argoApplication;

            await deleteArgoApplication({
                argoApplication,
            });
        }
    }, [deleteArgoApplication, enrichedApplicationsByApplicationName, getValues, selected]);

    return (
        <FormProvider {...methods}>
            <div className={classes.tableRoot}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Render condition={numSelected > 0}>
                                        <Typography variant={'body1'}>
                                            {numSelected} item(s) selected
                                        </Typography>
                                    </Render>
                                </TableCell>
                                <TableCell>
                                    <Grid container alignItems={'center'} spacing={2}>
                                        <Grid item>
                                            <Tooltip
                                                title={
                                                    'Deploy selected applications with selected image stream version'
                                                }
                                            >
                                                <Button
                                                    onClick={onDeployClick}
                                                    variant={'contained'}
                                                    color={'primary'}
                                                    size="small"
                                                    disabled={
                                                        !numSelected ||
                                                        !buttonsEnabledMap.deploy ||
                                                        someArgoApplicationMutationIsLoading ||
                                                        qualityGatePipelineIsRunning
                                                    }
                                                >
                                                    deploy
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip
                                                title={
                                                    'Update selected applications with selected image stream version'
                                                }
                                            >
                                                <Button
                                                    onClick={onUpdateClick}
                                                    variant={'contained'}
                                                    color={'primary'}
                                                    size="small"
                                                    disabled={
                                                        !numSelected ||
                                                        !buttonsEnabledMap.update ||
                                                        someArgoApplicationMutationIsLoading ||
                                                        qualityGatePipelineIsRunning
                                                    }
                                                >
                                                    update
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title={'Uninstall selected applications'}>
                                                <Button
                                                    onClick={onUninstallClick}
                                                    variant={'contained'}
                                                    color={'primary'}
                                                    size="small"
                                                    disabled={
                                                        !numSelected ||
                                                        !buttonsEnabledMap.update ||
                                                        someArgoApplicationMutationIsLoading ||
                                                        qualityGatePipelineIsRunning
                                                    }
                                                >
                                                    uninstall
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <Grid container alignItems={'center'} spacing={2}>
                                        <Grid item>
                                            <Tooltip
                                                title={
                                                    'Set selected applications latest image stream version'
                                                }
                                            >
                                                <Button
                                                    onClick={onLatestClick}
                                                    variant={'outlined'}
                                                    color={'primary'}
                                                    size="small"
                                                    fullWidth
                                                    disabled={!numSelected}
                                                >
                                                    latest
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip
                                                title={
                                                    'Set selected applications stable image stream version'
                                                }
                                            >
                                                <Button
                                                    onClick={onStableClick}
                                                    variant={'outlined'}
                                                    color={'primary'}
                                                    size="small"
                                                    fullWidth
                                                    disabled={!numSelected}
                                                >
                                                    stable
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title={'Reset selected image stream versions'}>
                                                <Button
                                                    onClick={() => reset()}
                                                    variant={'outlined'}
                                                    color={'primary'}
                                                    size="small"
                                                    fullWidth
                                                    disabled={!selected || !selected.length}
                                                >
                                                    reset
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color={'primary'}
                                        indeterminate={numSelected > 0 && numSelected < rowCount}
                                        checked={rowCount > 0 && numSelected === rowCount}
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>
                                {columns.map(column => (
                                    <TableCell key={column.label}>{column.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enrichedApplicationsWithArgoApplications &&
                                enrichedApplicationsWithArgoApplications.length &&
                                enrichedApplicationsWithArgoApplications.map((row, index) => {
                                    const {
                                        application: {
                                            metadata: { name },
                                        },
                                    } = row;
                                    const isItemSelected = isSelected(name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={name}
                                            selected={isItemSelected}
                                            style={
                                                isItemSelected
                                                    ? {
                                                          backgroundColor: 'rgb(137 196 244 / 16%)',
                                                      }
                                                    : null
                                            }
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color={'primary'}
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={event => handleRowClick(event, name)}
                                                />
                                            </TableCell>
                                            {columns.map(column => (
                                                <TableCell key={column.label}>
                                                    {column.getter(row)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </FormProvider>
    );
};
