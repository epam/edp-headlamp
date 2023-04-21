import { useForm } from 'react-hook-form';
import { FormSelect } from '../../../../../../../../components/FormComponents';
import { PIPELINE_TYPES } from '../../../../../../../../constants/pipelineTypes';
import { usePipelinesByType } from '../../../../../../../../hooks/usePipelinesByType';
import { MuiCore, React } from '../../../../../../../../plugin.globals';
import { createRandomFiveSymbolString } from '../../../../../../../../utils/createRandomFiveSymbolString';
import { CDPipelineDataContext } from '../../../../../../index';
import { CurrentCDPipelineStageDataContext } from '../../../../index';
import { useCreateDeployPipelineRun } from './hooks/useCreateDeployPipelineRun';
import { PipelineRunTriggerProps } from './types';

const { Grid, Button } = MuiCore;

const pipelineNameFieldName = 'pipelineName';

export const PipelineRunTrigger = ({
    namespace,
    runActionIsEnabled,
    enrichedApplicationsWithArgoApplications,
}: PipelineRunTriggerProps): React.ReactElement => {
    const CurrentCDPipelineStageDataContextValue = React.useContext(
        CurrentCDPipelineStageDataContext
    );
    const CDPipelineDataContextValue = React.useContext(CDPipelineDataContext);

    const {
        control,
        formState: { errors },
        watch,
    } = useForm();

    const { pipelines } = usePipelinesByType({
        namespace,
        pipelineType: PIPELINE_TYPES['DEPLOY'],
    });

    const pipelineOptions = pipelines.map(({ metadata: { name } }) => ({
        label: name,
        value: name,
    }));

    const pipelineNameFieldValue = watch(pipelineNameFieldName);

    const { createDeployPipelineRun } = useCreateDeployPipelineRun({});

    const codebaseTag = React.useMemo(() => {
        return enrichedApplicationsWithArgoApplications
            .reduce((acc, { enrichedApplication: { application }, argoApplication }) => {
                if (!argoApplication) {
                    return [];
                }

                const deployedVersion =
                    argoApplication.spec.source.helm.parameters.find(el => el.name === 'image.tag')
                        ?.value || '';

                const appTag = `${application.metadata.name}=${deployedVersion}`;
                acc.push(appTag);
                return acc;
            }, [])
            .join(' ');
    }, [enrichedApplicationsWithArgoApplications]);

    const randomPostfix = createRandomFiveSymbolString();

    const handleRunClick = React.useCallback(async (): Promise<void> => {
        await createDeployPipelineRun({
            namespace,
            pipelineName: pipelineNameFieldValue,
            stageName: CurrentCDPipelineStageDataContextValue.spec.name,
            CDPipelineName: CDPipelineDataContextValue.metadata.name,
            randomPostfix,
            codebaseTag,
        });
    }, [
        CDPipelineDataContextValue,
        CurrentCDPipelineStageDataContextValue,
        codebaseTag,
        createDeployPipelineRun,
        namespace,
        pipelineNameFieldValue,
        randomPostfix,
    ]);

    return (
        <form>
            <Grid container spacing={2} alignItems={'center'}>
                <Grid item style={{ flexGrow: 1 }}>
                    <FormSelect
                        control={control}
                        errors={errors}
                        name={pipelineNameFieldName}
                        options={pipelineOptions}
                        disabled={!pipelineOptions.length}
                        placeholder={'Select pipeline name'}
                    />
                </Grid>
                <Grid item>
                    <Button
                        component={'button'}
                        type={'button'}
                        variant={'contained'}
                        color={'primary'}
                        size={'small'}
                        disabled={!runActionIsEnabled || !pipelineNameFieldValue}
                        onClick={handleRunClick}
                    >
                        Run
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
