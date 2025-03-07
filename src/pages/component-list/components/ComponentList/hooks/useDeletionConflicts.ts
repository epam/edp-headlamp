import React from 'react';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { useCDPipelineListQuery } from '../../../../../k8s/groups/EDP/CDPipeline/hooks/useCDPipelineListQuery';
import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { useCDPipelineStageListQuery } from '../../../../../k8s/groups/EDP/Stage/hooks/useCDPipelineStageListQuery';
import { ComponentsToDelete, ComponentsToDeleteConflicts } from '../types';

export const useDeletionConflicts = (
  selectedComponents: string[],
  componentsByNameMap: Map<string, CodebaseKubeObjectInterface>
): {
  componentsToDelete: ComponentsToDelete | null;
  componentsToDeleteConflicts: ComponentsToDeleteConflicts | null;
} => {
  const CDPipelineListQuery = useCDPipelineListQuery({
    options: {
      enabled:
        !!selectedComponents && selectedComponents.length > 0 && componentsByNameMap !== null,
    },
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
      const componentObject = componentsByNameMap.get(component);
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
