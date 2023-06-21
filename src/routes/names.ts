import { EDPCDPipelineKubeObjectConfig } from '../k8s/EDPCDPipeline/config';
import { EDPGitServerKubeObjectConfig } from '../k8s/EDPGitServer/config';

export const EDP_ROOT_ROUTE_NAME = 'root';

export const CDPIPELINES_ROUTE_NAME = EDPCDPipelineKubeObjectConfig.name.pluralForm;
export const CDPIPELINE_ROUTE_NAME = EDPCDPipelineKubeObjectConfig.name.singularForm;

export const GIT_SERVERS_ROUTE_NAME = EDPGitServerKubeObjectConfig.name.pluralForm;
export const GIT_SERVER_ROUTE_NAME = EDPGitServerKubeObjectConfig.name.singularForm;

export const OVERVIEW_ROUTE_NAME = 'overview';
export const COMPONENTS_ROUTE_NAME = 'components';
export const COMPONENT_ROUTE_NAME = 'component';
export const STAGES_ROUTE_NAME = 'stage';
export const STAGE_ROUTE_NAME = 'stages';
