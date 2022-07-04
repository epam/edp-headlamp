import { EDPCDPipelineKubeObjectConfig } from '../k8s/EDPCDPipeline/config';
import { EDPCodebaseKubeObjectConfig } from '../k8s/EDPCodebase/config';
import { EDPComponentKubeObjectConfig } from '../k8s/EDPComponent/config';

export const EDP_ROOT_ROUTE_NAME = 'root';
export const LIBRARIES_ROUTE_NAME = EDPCodebaseKubeObjectConfig.types.library.name.pluralForm;
export const LIBRARY_ROUTE_NAME = EDPCodebaseKubeObjectConfig.types.library.name.singularForm;
export const APPLICATIONS_ROUTE_NAME =
    EDPCodebaseKubeObjectConfig.types.application.name.pluralForm;
export const APPLICATION_ROUTE_NAME =
    EDPCodebaseKubeObjectConfig.types.application.name.singularForm;
export const AUTOTESTS_ROUTE_NAME = EDPCodebaseKubeObjectConfig.types.autotest.name.pluralForm;
export const AUTOTEST_ROUTE_NAME = EDPCodebaseKubeObjectConfig.types.autotest.name.singularForm;
export const COMPONENTS_ROUTE_NAME = EDPComponentKubeObjectConfig.name.pluralForm;
export const CDPIPELINES_ROUTE_NAME = EDPCDPipelineKubeObjectConfig.name.pluralForm;
export const CDPIPELINE_ROUTE_NAME = EDPCDPipelineKubeObjectConfig.name.singularForm;
