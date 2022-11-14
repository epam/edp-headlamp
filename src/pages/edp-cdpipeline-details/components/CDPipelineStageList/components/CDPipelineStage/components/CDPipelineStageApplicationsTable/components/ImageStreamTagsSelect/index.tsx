import { useForm } from 'react-hook-form';
import { FormSelect } from '../../../../../../../../../../components/FormComponents';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../../../../../../constants/codebaseVersioningTypes';
import { EnrichedApplication } from '../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { useRequest } from '../../../../../../../../../../hooks/useRequest';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../k8s/Application/types';
import { MuiCore, React } from '../../../../../../../../../../plugin.globals';
import { CDPipelineDataContext } from '../../../../../../../../view';
import {
    CDPipelineStagesDataContext,
    CurrentCDPipelineStageDataContext,
} from '../../../../../../view';
import { createApplicationInterface, useCreateApplication } from './hooks/useCreateApplication';
import { useImageStreamBasedOnResources } from './hooks/useImageStreamBasedOnResources';

const { Grid, Button } = MuiCore;

export const ImageStreamTagsSelect = ({ application }: { application: EnrichedApplication }) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
        resetField,
    } = useForm();

    const streamTagFieldName = 'imageTag';
    const streamTagFieldValue = watch(streamTagFieldName);

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
            resetField(streamTagFieldName);
        },
        () => {
            resetField(streamTagFieldName);
        }
    );

    const applyFunc = React.useCallback(
        async (data: createApplicationInterface): Promise<ApplicationKubeObjectInterface> =>
            createApplication(data),
        [createApplication]
    );

    const {
        state: { isLoading },
        fireRequest,
    } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'create',
        },
    });

    const handleApply = React.useCallback(
        async (data: createApplicationInterface): Promise<void> => {
            const { pipelineName, stageName, appName } = data;
            const name = `${pipelineName}-${stageName}-${appName}`;

            await fireRequest({
                objectName: name,
                args: [data],
            });
        },
        [fireRequest]
    );

    const onSubmit = async ({ imageTag }) => {
        const isEDPVersioning =
            application.application.spec.versioning.type === CODEBASE_VERSIONING_TYPES['EDP'];

        const imageTagName = isEDPVersioning ? `build/${imageTag}` : imageTag;

        await handleApply({
            pipelineName: CDPipeline.metadata.name,
            stageName: currentCDPipelineStage.spec.name,
            appName: application.application.metadata.name,
            imageName: imageStream.spec.imageName,
            imageTag: imageTagName,
            namespace: CDPipeline.metadata.namespace,
        });
    };

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
                        disabled={!streamTagFieldValue || isLoading}
                    >
                        Deploy
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
