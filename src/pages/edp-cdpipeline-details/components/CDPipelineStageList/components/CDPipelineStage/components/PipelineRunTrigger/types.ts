import { EnrichedApplication } from '../../../../../../../../hooks/useApplicationsInCDPipeline';
import { ApplicationKubeObjectInterface } from '../../../../../../../../k8s/Application/types';

export interface PipelineRunTriggerProps {
    namespace: string;
    runActionIsEnabled: boolean;
    enrichedApplicationsWithArgoApplications: {
        application: EnrichedApplication;
        argoApplication: ApplicationKubeObjectInterface;
    }[];
}
