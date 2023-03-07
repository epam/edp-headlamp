import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { FormSelect } from '../../../../../../../../../../components/FormComponents';
import { Render } from '../../../../../../../../../../components/Render';
import {
    createApplicationInstance,
    editApplicationInstance,
} from '../../../../../../../../../../configs/k8s-resource-instances/custom-resources/application';
import { CRUD_TYPES } from '../../../../../../../../../../constants/crudTypes';
import { EnrichedApplication } from '../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { useRequestStatusMessages } from '../../../../../../../../../../hooks/useResourceRequestStatusMessages';
import { ApplicationKubeObject } from '../../../../../../../../../../k8s/Application';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../k8s/Application/types';
import { MuiCore, React } from '../../../../../../../../../../plugin.globals';
import { rem } from '../../../../../../../../../../utils/styling/rem';
import { CDPipelineDataContext } from '../../../../../../../../index';
import {
    CDPipelineStagesDataContext,
    CurrentCDPipelineStageDataContext,
    GitServersDataContext,
} from '../../../../../../index';
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

    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const createApplicationMutation = useMutation(
        (newArgoApplicationData: ApplicationKubeObjectInterface) => {
            return ApplicationKubeObject.apiEndpoint.post(newArgoApplicationData);
        },
        {
            onMutate: newArgoApplicationData =>
                showBeforeRequestMessage(newArgoApplicationData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, newArgoApplicationData) =>
                showRequestSuccessMessage(newArgoApplicationData.metadata.name, CRUD_TYPES.CREATE),
            onError: (error, newArgoApplicationData) => {
                showRequestErrorMessage(newArgoApplicationData.metadata.name, CRUD_TYPES.CREATE);
                console.error('onCreateError', error);
            },
        }
    );

    const editApplicationMutation = useMutation(
        (newArgoApplicationData: ApplicationKubeObjectInterface) => {
            return ApplicationKubeObject.apiEndpoint.put(newArgoApplicationData);
        },
        {
            onMutate: newArgoApplicationData =>
                showBeforeRequestMessage(newArgoApplicationData.metadata.name, CRUD_TYPES.EDIT),
            onSuccess: (data, newArgoApplicationData) =>
                showRequestSuccessMessage(newArgoApplicationData.metadata.name, CRUD_TYPES.EDIT),
            onError: (error, newArgoApplicationData) => {
                showRequestErrorMessage(newArgoApplicationData.metadata.name, CRUD_TYPES.EDIT);
                console.error(error);
            },
        }
    );

    const deleteApplicationMutation = useMutation(
        (argoApplication: ApplicationKubeObjectInterface) => {
            return ApplicationKubeObject.apiEndpoint.delete(
                argoApplication.metadata.namespace,
                argoApplication.metadata.name
            );
        },
        {
            onMutate: argoApplication =>
                showBeforeRequestMessage(argoApplication.metadata.name, CRUD_TYPES.DELETE),
            onSuccess: (data, argoApplication) =>
                showRequestSuccessMessage(argoApplication.metadata.name, CRUD_TYPES.DELETE),
            onError: (error, argoApplication) => {
                showRequestErrorMessage(argoApplication.metadata.name, CRUD_TYPES.DELETE);
                console.error(error);
            },
        }
    );

    const handleCreateRequest = React.useCallback(async (): Promise<void> => {
        const [gitServer] = gitServers.filter(
            el => el.metadata.name === enrichedApplication.application.spec.gitServer
        );

        const newArgoApplicationData = createApplicationInstance({
            CDPipeline,
            currentCDPipelineStage,
            enrichedApplication,
            imageStream,
            imageTag: streamTagFieldValue,
            gitServer,
        });

        createApplicationMutation.mutate(newArgoApplicationData);
    }, [
        gitServers,
        CDPipeline,
        currentCDPipelineStage,
        enrichedApplication,
        imageStream,
        streamTagFieldValue,
        createApplicationMutation,
    ]);

    const handleEditRequest = React.useCallback(async (): Promise<void> => {
        const newArgoApplicationData: ApplicationKubeObjectInterface = editApplicationInstance({
            argoApplication,
            enrichedApplication,
            imageTag: streamTagFieldValue,
        });

        editApplicationMutation.mutate(newArgoApplicationData);
    }, [argoApplication, enrichedApplication, streamTagFieldValue, editApplicationMutation]);

    const handleDeleteRequest = React.useCallback(async (): Promise<void> => {
        deleteApplicationMutation.mutate(argoApplication);
    }, [argoApplication, deleteApplicationMutation]);

    const crudActionDisabled = React.useMemo(
        () =>
            !streamTagFieldValue ||
            createApplicationMutation.isLoading ||
            editApplicationMutation.isLoading ||
            deleteApplicationMutation.isLoading ||
            qualityGatePipelineIsRunning,
        [
            createApplicationMutation.isLoading,
            deleteApplicationMutation.isLoading,
            editApplicationMutation.isLoading,
            qualityGatePipelineIsRunning,
            streamTagFieldValue,
        ]
    );

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
                            disabled={crudActionDisabled}
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
                            disabled={crudActionDisabled}
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
                        disabled={
                            !argoApplication ||
                            deleteApplicationMutation.isLoading ||
                            qualityGatePipelineIsRunning
                        }
                        onClick={handleDeleteRequest}
                    >
                        Uninstall
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
