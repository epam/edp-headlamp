import ErrorBoundary from '../../../../../../../../components/ErrorBoundary/view';
import { HeadlampSimpleTable } from '../../../../../../../../components/HeadlampSimpleTable';
import { streamApplicationListByPipelineStageLabel } from '../../../../../../../../k8s/Application';
import { ApplicationKubeObjectInterface } from '../../../../../../../../k8s/Application/types';
import { React } from '../../../../../../../../plugin.globals';
import { ApplicationsContext, CDPipelineDataContext } from '../../../../../../view';
import { CurrentCDPipelineStageDataContext } from '../../../../view';
import { useColumns } from './hooks/useColumns';

export const CDPipelineStageApplicationsTable = (): React.ReactElement => {
    const columns = useColumns();
    const enrichedWithImageStreamsApplications = React.useContext(ApplicationsContext);
    const CDPipeline = React.useContext(CDPipelineDataContext);
    const CDPipelineStage = React.useContext(CurrentCDPipelineStageDataContext);

    const [argoApplications, setArgoApplications] = React.useState<
        ApplicationKubeObjectInterface[]
    >([]);

    const enrichedApplicationsWithArgoApplications = React.useMemo(
        () =>
            enrichedWithImageStreamsApplications.map(enrichedApplication => {
                const fitArgoApplication = argoApplications.find(
                    argoApplication =>
                        argoApplication.metadata.labels['app.edp.epam.com/app-name'] ===
                        enrichedApplication.application.metadata.name
                );

                return {
                    application: enrichedApplication,
                    argoApplication: fitArgoApplication,
                };
            }),
        [enrichedWithImageStreamsApplications, argoApplications]
    );

    const [, setError] = React.useState<Error>(null);

    const handleStoreArgoApplications = React.useCallback(
        (argoApplications: ApplicationKubeObjectInterface[]) => {
            setArgoApplications(argoApplications);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamApplicationListByPipelineStageLabel(
            `${CDPipeline.metadata.name}-${CDPipelineStage.spec.name}`,
            handleStoreArgoApplications,
            handleError,
            CDPipeline.metadata.namespace
        );

        return () => cancelStream();
    }, [CDPipeline, CDPipelineStage, handleError, handleStoreArgoApplications]);

    return (
        <ErrorBoundary>
            <HeadlampSimpleTable
                data={enrichedApplicationsWithArgoApplications}
                columns={columns}
            />
        </ErrorBoundary>
    );
};
