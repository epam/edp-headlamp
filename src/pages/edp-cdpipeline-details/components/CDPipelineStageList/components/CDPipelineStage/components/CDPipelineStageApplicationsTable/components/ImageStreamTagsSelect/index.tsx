import { useForm } from 'react-hook-form';
import { FormSelect } from '../../../../../../../../../../components/FormComponents';
import { Render } from '../../../../../../../../../../components/Render';
import { ICONS } from '../../../../../../../../../../constants/icons';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../k8s/Application/types';
import { EnrichedApplicationWithImageStreams } from '../../../../../../../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { useGitServerListQuery } from '../../../../../../../../../../k8s/EDPGitServer/hooks/useGitServerListQuery';
import { Iconify, MuiCore, React } from '../../../../../../../../../../plugin.globals';
import { rem } from '../../../../../../../../../../utils/styling/rem';
import { CDPipelineDataContext } from '../../../../../../../../index';
import {
    CDPipelineStagesDataContext,
    CurrentCDPipelineStageDataContext,
} from '../../../../../../index';
import { useCreateArgoApplication } from './hooks/useCreateArgoApplication';
import { useImageStreamBasedOnResources } from './hooks/useImageStreamBasedOnResources';

const { Grid, Tooltip, IconButton } = MuiCore;
const { Icon } = Iconify;

export const ImageStreamTagsSelect = ({
    enrichedApplication,
    argoApplication,
    qualityGatePipelineIsRunning,
}: {
    enrichedApplication: EnrichedApplicationWithImageStreams;
    argoApplication: ApplicationKubeObjectInterface;
    qualityGatePipelineIsRunning: boolean;
    jaegerLink: string;
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
    const { data: gitServers } = useGitServerListQuery({});

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
            gitServers: gitServers?.items,
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
                <Grid item>
                    <div style={{ width: rem(250) }}>
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
                        <Tooltip title={'Deploy'}>
                            <span>
                                <IconButton
                                    aria-label={'Deploy'}
                                    onClick={handleCreateRequest}
                                    disabled={createEditActionDisabled}
                                >
                                    <Icon icon={ICONS.DEPLOY} color={'grey'} width="20" />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Render>
                    <Render condition={!!argoApplication}>
                        <Tooltip title={'Update'}>
                            <span>
                                <IconButton
                                    aria-label={'Update'}
                                    onClick={handleEditRequest}
                                    disabled={createEditActionDisabled}
                                >
                                    <Icon icon={ICONS.SYNC} color={'grey'} width="20" />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Render>
                </Grid>
                <Grid item>
                    <Tooltip title={'Uninstall'}>
                        <span>
                            <IconButton
                                aria-label={'Uninstall'}
                                onClick={handleDeleteRequest}
                                disabled={deleteActionDisabled}
                            >
                                <Icon icon={ICONS.BUCKET} color={'grey'} width="20" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>
            </Grid>
        </form>
    );
};
