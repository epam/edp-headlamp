import { useForm } from 'react-hook-form';
import { FormSelect } from '../../../../../../../../../../components/FormComponents';
import { Render } from '../../../../../../../../../../components/Render';
import { EnrichedApplication } from '../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../k8s/Application/types';
import { MuiCore, React } from '../../../../../../../../../../plugin.globals';
import { rem } from '../../../../../../../../../../utils/styling/rem';
import { CDPipelineDataContext } from '../../../../../../../../index';
import {
    CDPipelineStagesDataContext,
    CurrentCDPipelineStageDataContext,
    GitServersDataContext,
} from '../../../../../../index';
import { useCreateArgoApplication } from './hooks/useCreateArgoApplication';
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

    const handleCreateRequest = React.useCallback(async () => {
        await createArgoApplication({
            gitServers,
            CDPipeline,
            currentCDPipelineStage,
            enrichedApplication,
            imageStream,
            imageTag: streamTagFieldValue,
        });
    }, [
        CDPipeline,
        createArgoApplication,
        currentCDPipelineStage,
        enrichedApplication,
        gitServers,
        imageStream,
        streamTagFieldValue,
    ]);

    const handleEditRequest = React.useCallback(async () => {
        await editArgoApplication({
            argoApplication,
            enrichedApplication,
            imageTag: streamTagFieldValue,
        });
    }, [argoApplication, editArgoApplication, enrichedApplication, streamTagFieldValue]);

    const handleDeleteRequest = React.useCallback(async () => {
        await deleteArgoApplication({
            argoApplication,
        });
    }, [argoApplication, deleteArgoApplication]);

    const createEditActionDisabled = React.useMemo(
        () =>
            !streamTagFieldValue ||
            argoApplicationCreateMutation.isLoading ||
            argoApplicationEditMutation.isLoading ||
            argoApplicationDeleteMutation.isLoading ||
            qualityGatePipelineIsRunning,
        [
            argoApplicationCreateMutation.isLoading,
            argoApplicationDeleteMutation.isLoading,
            argoApplicationEditMutation.isLoading,
            qualityGatePipelineIsRunning,
            streamTagFieldValue,
        ]
    );

    const deleteActionDisabled = React.useMemo(
        () =>
            !argoApplication ||
            argoApplicationDeleteMutation.isLoading ||
            qualityGatePipelineIsRunning,
        [argoApplication, argoApplicationDeleteMutation.isLoading, qualityGatePipelineIsRunning]
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
                            disabled={createEditActionDisabled}
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
                            disabled={createEditActionDisabled}
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
                        disabled={deleteActionDisabled}
                        onClick={handleDeleteRequest}
                    >
                        Uninstall
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
