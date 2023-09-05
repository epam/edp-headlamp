import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Table } from '../../../../components/Table';
import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../../../../configs/codebase-mappings';
import { useCreateArgoApplication } from '../../../../k8s/Application/hooks/useCreateArgoApplication';
import { useGitServerListQuery } from '../../../../k8s/EDPGitServer/hooks/useGitServerListQuery';
import { mapEvery } from '../../../../utils/loops/mapEvery';
import { useCDPipelineQueryContext } from '../../providers/CDPipelineQuery/hooks';
import { useCDPipelineStageContext } from '../../providers/CDPipelineStage/hooks';
import { EnrichedApplicationWithArgoApplication } from '../../types';
import { useColumns } from './hooks/useColumns';
import { useUpperColumns } from './hooks/useUpperColumns';
import { ApplicationsProps } from './types';

const parseTagLabelValue = (tag: string) => {
    if (tag.includes('::')) {
        const [label, value] = tag.split('::');
        return { value, label };
    } else {
        return { value: tag, label: undefined };
    }
};

interface ButtonsMap {
    deploy: boolean;
    update: boolean;
    uninstall: boolean;
}

export const Applications = ({
    enrichedApplicationsWithArgoApplications,
    qualityGatePipelineIsRunning,
}: ApplicationsProps) => {
    const { CDPipelineQuery } = useCDPipelineQueryContext();
    const { stage } = useCDPipelineStageContext();
    const { data: gitServers } = useGitServerListQuery({});

    const { getValues, setValue, resetField, trigger } = useFormContext();
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

    const handleSelectRowClick = React.useCallback(
        (event: React.MouseEvent<unknown>, row: EnrichedApplicationWithArgoApplication) => {
            const name = row.application.metadata.name;
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

    const columns = useColumns(qualityGatePipelineIsRunning, handleSelectRowClick, selected);

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

    const buttonsEnabledMap: ButtonsMap = React.useMemo(() => {
        if (!selected || !selected.length) {
            return null;
        }

        const map = selected.reduce((acc, selectedApplication) => {
            {
                const application =
                    enrichedApplicationsByApplicationName.get(selectedApplication)?.application;
                const argoApplicationBySelectedApplication =
                    enrichedApplicationsByApplicationName.get(selectedApplication)?.argoApplication;

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
        }, new Map<string, ButtonsMap>());

        const deployBoolean = mapEvery(map, value => value.deploy);

        const updateBoolean = mapEvery(map, value => value.update);

        const uninstallBoolean = mapEvery(map, value => value.uninstall);

        return {
            deploy: deployBoolean,
            update: updateBoolean,
            uninstall: uninstallBoolean,
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

        for (const enrichedApplication of enrichedApplicationsWithArgoApplications) {
            const appName = enrichedApplication.application.metadata.name;

            if (!selected.includes(appName)) {
                continue;
            }

            const imageTagFieldValue = values[`${appName}::image-tag`];
            const valuesOverrideFieldValue = values[`${appName}::values-override`];

            const { value: tagValue, label: tagLabel } = parseTagLabelValue(imageTagFieldValue);
            const application = enrichedApplicationsByApplicationName.get(appName)?.application;
            const applicationImageStream =
                enrichedApplicationsByApplicationName.get(appName)?.applicationImageStream;
            const applicationVerifiedImageStream =
                enrichedApplicationsByApplicationName.get(appName)?.applicationVerifiedImageStream;

            await createArgoApplication({
                gitServers: gitServers?.items,
                CDPipeline: CDPipelineQuery?.data,
                currentCDPipelineStage: stage,
                application,
                imageStream:
                    tagLabel === 'stable' ? applicationVerifiedImageStream : applicationImageStream,
                imageTag: tagValue,
                valuesOverride: valuesOverrideFieldValue,
            });
        }
    }, [
        CDPipelineQuery,
        createArgoApplication,
        enrichedApplicationsByApplicationName,
        enrichedApplicationsWithArgoApplications,
        getValues,
        gitServers,
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

        for (const enrichedApplication of enrichedApplicationsWithArgoApplications) {
            const appName = enrichedApplication.application.metadata.name;

            if (!selected.includes(appName)) {
                continue;
            }
            const imageTagFieldValue = values[`${appName}::image-tag`];

            const { value: tagValue } = parseTagLabelValue(imageTagFieldValue);
            const application = enrichedApplicationsByApplicationName.get(appName)?.application;
            const argoApplication =
                enrichedApplicationsByApplicationName.get(appName)?.argoApplication;

            await editArgoApplication({
                argoApplication,
                application,
                imageTag: tagValue,
            });
        }
    }, [
        editArgoApplication,
        enrichedApplicationsByApplicationName,
        enrichedApplicationsWithArgoApplications,
        getValues,
        selected,
        trigger,
    ]);

    const onUninstallClick = React.useCallback(async () => {
        for (const enrichedApplication of enrichedApplicationsWithArgoApplications) {
            const appName = enrichedApplication.application.metadata.name;

            if (!selected.includes(appName)) {
                continue;
            }

            const argoApplication =
                enrichedApplicationsByApplicationName.get(appName)?.argoApplication;

            await deleteArgoApplication({
                argoApplication,
            });
        }
    }, [
        deleteArgoApplication,
        enrichedApplicationsByApplicationName,
        enrichedApplicationsWithArgoApplications,
        selected,
    ]);

    const upperColumns = useUpperColumns({
        selected,
        buttonsEnabledMap,
        onDeployClick,
        onUpdateClick,
        onUninstallClick,
        onLatestClick,
        onStableClick,
        someArgoApplicationMutationIsLoading,
        qualityGatePipelineIsRunning,
    });

    return (
        <>
            <Grid container spacing={2} justifyContent={'flex-end'}>
                <Grid item xs={12}>
                    <Table<EnrichedApplicationWithArgoApplication>
                        data={enrichedApplicationsWithArgoApplications}
                        isLoading={!enrichedApplicationsWithArgoApplications}
                        columns={columns}
                        upperColumns={upperColumns}
                        handleSelectRowClick={handleSelectRowClick}
                        handleSelectAllClick={handleSelectAllClick}
                        selected={selected}
                        isSelected={row => selected.indexOf(row.application.metadata.name) !== -1}
                    />
                </Grid>
            </Grid>
        </>
    );
};
