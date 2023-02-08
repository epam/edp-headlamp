import { useForm } from 'react-hook-form';
import { FormSelect } from '../../../../../../../../../../components/FormComponents';
import { Render } from '../../../../../../../../../../components/Render';
import { EnrichedApplication } from '../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { useRequest } from '../../../../../../../../../../hooks/useRequest';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../k8s/Application/types';
import { MuiCore, React } from '../../../../../../../../../../plugin.globals';
import { rem } from '../../../../../../../../../../utils/styling/rem';
import { CDPipelineDataContext } from '../../../../../../../../index';
import {
    CDPipelineStagesDataContext,
    CurrentCDPipelineStageDataContext,
    GitServersDataContext,
} from '../../../../../../index';
import { useApplicationCRUD } from './hooks/useApplicationCRUD';
import {
    createApplicationInterface,
    deleteApplicationInterface,
    editApplicationInterface,
} from './hooks/useApplicationCRUD/types';
import { useImageStreamBasedOnResources } from './hooks/useImageStreamBasedOnResources';

const { Grid, Button } = MuiCore;

export const ImageStreamTagsSelect = ({
    enrichedApplication,
    argoApplication,
    qualityGatePipelineIsRunning,
}: {
    enrichedApplication: EnrichedApplication;
    argoApplication: ApplicationKubeObjectInterface;
    qualityGatePipelineIsRunning: boolean;
}) => {
    const {
        control,
        formState: { errors },
        watch,
    } = useForm();

    const streamTagFieldName = 'imageTag';
    const streamTagFieldValue = watch(streamTagFieldName);

    const CDPipeline = React.useContext(CDPipelineDataContext);
    const currentCDPipelineStage = React.useContext(CurrentCDPipelineStageDataContext);
    const CDPipelineStages = React.useContext(CDPipelineStagesDataContext);
    const gitServers = React.useContext(GitServersDataContext);

    const currentArgoAppName = `${CDPipeline.metadata.name}-${currentCDPipelineStage.spec.name}-${enrichedApplication.application.metadata.name}`;
    const { imageStream } = useImageStreamBasedOnResources({
        enrichedApplication,
        CDPipeline,
        currentCDPipelineStage,
        CDPipelineStages,
    });

    const imageStreamTagsOptions =
        imageStream && imageStream.spec.tags
            ? imageStream.spec.tags.map(({ name }) => ({
                  label: name,
                  value: name,
              }))
            : [];

    const { createApplication, editApplication, deleteApplication } = useApplicationCRUD({
        gitServers,
    });

    const {
        state: { isLoading: isApplying },
        fireRequest: fireCreateApplicationRequest,
    } = useRequest({
        requestFn: createApplication,
        options: {
            mode: 'create',
        },
    });

    const {
        state: { isLoading: isUpdating },
        fireRequest: fireEditApplicationRequest,
    } = useRequest({
        requestFn: editApplication,
        options: {
            mode: 'edit',
        },
    });

    const {
        state: { isLoading: isDeleting },
        fireRequest: fireDeleteApplicationRequest,
    } = useRequest({
        requestFn: deleteApplication,
        options: {
            mode: 'delete',
        },
    });

    const handleCreateRequest = React.useCallback(async (): Promise<void> => {
        await fireCreateApplicationRequest({
            objectName: currentArgoAppName,
            args: [
                {
                    CDPipeline,
                    currentCDPipelineStage,
                    enrichedApplication,
                    imageStream,
                    imageTag: streamTagFieldValue,
                } as createApplicationInterface,
            ],
        });
    }, [
        CDPipeline,
        enrichedApplication,
        currentArgoAppName,
        currentCDPipelineStage,
        fireCreateApplicationRequest,
        imageStream,
        streamTagFieldValue,
    ]);

    const handleEditRequest = React.useCallback(async (): Promise<void> => {
        await fireEditApplicationRequest({
            objectName: currentArgoAppName,
            args: [
                {
                    imageTag: streamTagFieldValue,
                    argoApplication,
                    enrichedApplication,
                } as editApplicationInterface,
            ],
        });
    }, [
        enrichedApplication,
        argoApplication,
        currentArgoAppName,
        fireEditApplicationRequest,
        streamTagFieldValue,
    ]);

    const handleDeleteRequest = React.useCallback(async (): Promise<void> => {
        await fireDeleteApplicationRequest({
            objectName: currentArgoAppName,
            args: [
                {
                    argoApplication,
                } as deleteApplicationInterface,
            ],
        });
    }, [argoApplication, currentArgoAppName, fireDeleteApplicationRequest]);

    return (
        <form>
            <Grid container spacing={2} alignItems={'center'}>
                <Grid item style={{ flexGrow: 1 }}>
                    <div style={{ maxWidth: rem(250), width: '100%' }}>
                        <FormSelect
                            control={control}
                            errors={errors}
                            name={streamTagFieldName}
                            options={imageStreamTagsOptions}
                            disabled={!imageStreamTagsOptions.length}
                            placeholder={'Image stream version'}
                        />
                    </div>
                </Grid>
                <Grid item>
                    <Render condition={!argoApplication}>
                        <Button
                            component={'button'}
                            type={'button'}
                            variant={'contained'}
                            color={'primary'}
                            size={'small'}
                            disabled={
                                !streamTagFieldValue ||
                                isApplying ||
                                isUpdating ||
                                qualityGatePipelineIsRunning
                            }
                            onClick={handleCreateRequest}
                        >
                            Deploy
                        </Button>
                    </Render>
                    <Render condition={!!argoApplication}>
                        <Button
                            component={'button'}
                            type={'button'}
                            variant={'contained'}
                            color={'primary'}
                            size={'small'}
                            disabled={
                                !streamTagFieldValue ||
                                isApplying ||
                                isUpdating ||
                                qualityGatePipelineIsRunning
                            }
                            onClick={handleEditRequest}
                        >
                            Update
                        </Button>
                    </Render>
                </Grid>
                <Grid item>
                    <Button
                        component={'button'}
                        type={'button'}
                        variant={'contained'}
                        color={'default'}
                        size={'small'}
                        disabled={!argoApplication || isDeleting || qualityGatePipelineIsRunning}
                        onClick={handleDeleteRequest}
                    >
                        Uninstall
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
