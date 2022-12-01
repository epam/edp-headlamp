import { EnrichedApplication } from '../../../../../../../../hooks/useApplicationsInCDPipeline';
import { ApplicationKubeObjectInterface } from '../../../../../../../../k8s/Application/types';

export interface PipelineRunTriggerProps {
    namespace: string;
    runActionIsDisabled: boolean;
    enrichedApplicationsWithArgoApplications: {
        application: EnrichedApplication;
        argoApplication: ApplicationKubeObjectInterface;
    }[];
}
