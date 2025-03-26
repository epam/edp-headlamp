import React from 'react';
import { useQuery } from 'react-query';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { CDPipelineKubeObject } from '../../../../../k8s/groups/EDP/CDPipeline';
import { REQUEST_KEY_QUERY_CD_PIPELINE_LIST } from '../../../../../k8s/groups/EDP/CDPipeline/requestKeys';
import { CDPipelineKubeObjectInterface } from '../../../../../k8s/groups/EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { useCDPipelineStageListQuery } from '../../../../../k8s/groups/EDP/Stage/hooks/useCDPipelineStageListQuery';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { ComponentsToDelete, ComponentsToDeleteConflicts } from '../types';

export const useDeletionConflicts = (
  selectedComponents: string[],
  componentsByNameMap: Map<string, CodebaseKubeObjectInterface> | null
): {
  componentsToDelete: ComponentsToDelete | null;
  componentsToDeleteConflicts: ComponentsToDeleteConflicts | null;
} => {
  const namespace = getDefaultNamespace();

  const CDPipelineListQuery = useQuery<
    KubeObjectListInterface<CDPipelineKubeObjectInterface>,
    Error
  >(REQUEST_KEY_QUERY_CD_PIPELINE_LIST, () => CDPipelineKubeObject.getList(namespace), {
    enabled: !!selectedComponents && selectedComponents.length > 0 && componentsByNameMap !== null,
  });

  const CDPipelineStageListQuery = useCDPipelineStageListQuery({
    options: {
      enabled:
        !!selectedComponents && selectedComponents.length > 0 && componentsByNameMap !== null,
    },
  });

  return React.useMemo(() => {
    const componentsWithConflicts: ComponentsToDeleteConflicts = new Map();
    const componentsCanBeDeleted: Map<string, CodebaseKubeObjectInterface> = new Map();

    if (
      CDPipelineListQuery.isLoading ||
      CDPipelineStageListQuery.isLoading ||
      componentsByNameMap === null
    ) {
      return {
        componentsToDelete: null,
        componentsToDeleteConflicts: null,
      };
    }

    const CDPipelines = CDPipelineListQuery.data?.items || [];
    const stages = CDPipelineStageListQuery.data?.items || [];

    for (const component of selectedComponents) {
      const componentObject = componentsByNameMap.get(component)!;
      const componentType = componentObject.spec?.type;

      if (componentType === CODEBASE_TYPE.SYSTEM) {
        continue;
      }

      if (componentType !== CODEBASE_TYPE.APPLICATION && componentType !== CODEBASE_TYPE.AUTOTEST) {
        componentsCanBeDeleted.set(component, componentObject);
        continue;
      }

      const componentName = componentObject.metadata?.name;

      const pipelineConflicts = CDPipelines.filter((pipeline) => {
        return pipeline.spec.applications.includes(componentName);
      });

      const stageConflicts = stages.filter((stage) =>
        stage.spec.qualityGates.some((qualityGate) => qualityGate.autotestName === componentName)
      );

      if (pipelineConflicts.length > 0 || stageConflicts.length > 0) {
        componentsWithConflicts.set(componentName, {
          component: componentObject,
          pipelines: pipelineConflicts,
          stages: stageConflicts,
        });
      } else {
        componentsCanBeDeleted.set(component, componentObject);
      }
    }

    return {
      componentsToDelete: componentsCanBeDeleted,
      componentsToDeleteConflicts: componentsWithConflicts,
    };
  }, [CDPipelineListQuery, CDPipelineStageListQuery, componentsByNameMap, selectedComponents]);
};
