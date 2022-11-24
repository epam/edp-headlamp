import { useForm } from 'react-hook-form';
import { FormSelect } from '../../../../../../../../../../components/FormComponents';
import { Render } from '../../../../../../../../../../components/Render';
import { EnrichedApplication } from '../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { useRequest } from '../../../../../../../../../../hooks/useRequest';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../k8s/Application/types';
import { MuiCore, React } from '../../../../../../../../../../plugin.globals';
import { CDPipelineDataContext } from '../../../../../../../../view';
import {
    CDPipelineStagesDataContext,
    CurrentCDPipelineStageDataContext,
} from '../../../../../../view';
import { useApplicationCRUD } from './hooks/useApplicationCRUD';
import { useImageStreamBasedOnResources } from './hooks/useImageStreamBasedOnResources';

const { Grid, Button } = MuiCore;

export const ImageStreamTagsSelect = ({
    application,
    argoApplication,
}: {
    application: EnrichedApplication;
    argoApplication: ApplicationKubeObjectInterface;
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
    const currentArgoAppName = `${CDPipeline.metadata.name}-${currentCDPipelineStage.spec.name}-${application.application.metadata.name}`;
    const CDPipelineStages = React.useContext(CDPipelineStagesDataContext);

    const { imageStream } = useImageStreamBasedOnResources({
        application,
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

    const { createApplication, editApplication, deleteApplication } = useApplicationCRUD();

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
                    pipelineName: CDPipeline.metadata.name,
                    stageName: currentCDPipelineStage.spec.name,
                    appName: application.application.metadata.name,
                    imageName: imageStream.spec.imageName,
                    namespace: CDPipeline.metadata.namespace,
                    versioningType: application.application.spec.versioning.type,
                    imageTag: streamTagFieldValue,
                },
            ],
        });
    }, [
        CDPipeline,
        application,
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
                    deployedVersion: streamTagFieldValue,
                    argoApplication,
                    versioningType: application.application.spec.versioning.type,
                },
            ],
        });
    }, [
        application,
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
                },
            ],
        });
    }, [argoApplication, currentArgoAppName, fireDeleteApplicationRequest]);

    return (
        <form>
            <Grid container spacing={2} alignItems={'center'}>
                <Grid item style={{ flexGrow: 1 }}>
                    <FormSelect
                        control={control}
                        errors={errors}
                        name={streamTagFieldName}
                        options={imageStreamTagsOptions}
                        disabled={!imageStreamTagsOptions.length}
                        placeholder={'Image stream version'}
                    />
                </Grid>
                <Grid item>
                    <Render condition={!argoApplication}>
                        <Button
                            component={'button'}
                            type={'button'}
                            variant={'contained'}
                            color={'primary'}
                            size={'small'}
                            disabled={!streamTagFieldValue || isApplying || isUpdating}
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
                            disabled={!streamTagFieldValue || isApplying || isUpdating}
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
                        disabled={!argoApplication || isDeleting}
                        onClick={handleDeleteRequest}
                    >
                        Uninstall
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
