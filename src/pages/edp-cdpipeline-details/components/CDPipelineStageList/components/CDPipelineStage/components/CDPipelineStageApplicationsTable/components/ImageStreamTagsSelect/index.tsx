import { useForm } from 'react-hook-form';
import { FormSelect } from '../../../../../../../../../../components/FormComponents';
import { EnrichedApplication } from '../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../k8s/Application/types';
import { MuiCore, React, ReactRedux } from '../../../../../../../../../../plugin.globals';
import { clusterAction } from '../../../../../../../../../../redux/actions';
import { CDPipelineDataContext } from '../../../../../../../../view';
import {
    CDPipelineStagesDataContext,
    CurrentCDPipelineStageDataContext,
} from '../../../../../../view';
import { useCreateApplication } from './hooks/useCreateApplication';
import { useImageStreamBasedOnResources } from './hooks/useImageStreamBasedOnResources';

const { Grid, Button } = MuiCore;
const { useDispatch } = ReactRedux;

export const ImageStreamTagsSelect = ({ application }: { application: EnrichedApplication }) => {
    const dispatch = useDispatch();
    const [isApplying, setIsApplying] = React.useState<boolean>(false);

    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();

    const CDPipeline = React.useContext(CDPipelineDataContext);

    const currentCDPipelineStage = React.useContext(CurrentCDPipelineStageDataContext);

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

    const { createApplication } = useCreateApplication(
        () => {
            setIsApplying(false);
        },
        () => {
            setIsApplying(false);
        }
    );

    const applyFunc = React.useCallback(
        async ({
            pipelineName,
            stageName,
            appName,
            imageName,
            imageTag,
            namespace,
        }): Promise<ApplicationKubeObjectInterface> =>
            createApplication({
                pipelineName,
                stageName,
                appName,
                imageName,
                imageTag,
                namespace,
            }),
        [createApplication]
    );
    const handleApply = React.useCallback(
        async ({
            pipelineName,
            stageName,
            appName,
            imageName,
            imageTag,
            namespace,
        }): Promise<void> => {
            const name = `${pipelineName}-${stageName}-${appName}`;
            setIsApplying(true);

            dispatch(
                clusterAction(
                    () =>
                        applyFunc({
                            pipelineName,
                            stageName,
                            appName,
                            imageName,
                            imageTag,
                            namespace,
                        }),
                    {
                        startMessage: `Applying ${name}`,
                        cancelledMessage: `Cancelled applying ${name}`,
                        successMessage: `Applied ${name}`,
                        errorMessage: `Failed to apply ${name}`,
                    }
                )
            );

            // temporary solution, since we cannot pass any callbacks for action cancelling
            setTimeout(() => setIsApplying(false), 3000);
        },
        [applyFunc, dispatch, setIsApplying]
    );

    const onSubmit = async ({ imageTag }) => {
        await handleApply({
            pipelineName: CDPipeline.metadata.name,
            stageName: currentCDPipelineStage.spec.name,
            appName: application.application.metadata.name,
            imageName: imageStream.spec.imageName,
            imageTag,
            namespace: CDPipeline.metadata.namespace,
        });
    };

    const streamTagFieldName = 'imageTag';
    const streamTagFieldValue = watch(streamTagFieldName);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} alignItems={'center'}>
                <Grid item xs={10}>
                    <FormSelect
                        control={control}
                        errors={errors}
                        name={streamTagFieldName}
                        options={imageStreamTagsOptions}
                        disabled={!imageStreamTagsOptions.length}
                        placeholder={'Choose image stream version'}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        component={'button'}
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        size={'small'}
                        disabled={!streamTagFieldValue || isApplying}
                    >
                        Deploy
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
