import React from 'react';
import { useParams } from 'react-router-dom';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { ApplicationKubeObject } from '../../../../k8s/groups/ArgoCD/Application';
import {
  APPLICATION_LABEL_SELECTOR_APP_NAME,
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../../k8s/groups/ArgoCD/Application/labels';
import { CDPipelineKubeObject } from '../../../../k8s/groups/EDP/CDPipeline';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE } from '../../../../k8s/groups/EDP/Codebase/labels';
import { StageKubeObject } from '../../../../k8s/groups/EDP/Stage';
import { STAGE_LABEL_SELECTOR_CD_PIPELINE_NAME } from '../../../../k8s/groups/EDP/Stage/labels';
import { CDPipelineRouteParams } from '../../types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<CDPipelineRouteParams>();

  const [CDPipeline, CDPipelineGetError] = CDPipelineKubeObject.useGet(name, namespace);

  const [stages, stagesError] = StageKubeObject.useList({
    namespace,
    labelSelector: `${STAGE_LABEL_SELECTOR_CD_PIPELINE_NAME}=${name}`,
  });

  const sortedStages = React.useMemo(() => {
    if (stages === null) {
      return null;
    }

    return stages.sort((a, b) => a.spec.order - b.spec.order).map((el) => el.jsonData);
  }, [stages]);

  const [applications, applicationsError] = CodebaseKubeObject.useList({
    namespace,
    labelSelector: `${CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE}=${CODEBASE_TYPES.APPLICATION}`,
  });

  const [argoApplications, argoApplicationsError] = ApplicationKubeObject.useList({
    namespace,
    labelSelector: `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${name}`,
  });

  const stagesWithApplicationsData = React.useMemo(() => {
    if (!applications || !argoApplications || !stages) {
      // are loading
      return null;
    }

    const argoApplicationsMap = argoApplications.reduce((map, argoApplication) => {
      const appName = argoApplication?.metadata.labels[APPLICATION_LABEL_SELECTOR_APP_NAME];
      const stageName = argoApplication?.metadata.labels[APPLICATION_LABEL_SELECTOR_STAGE];
      map[`${appName}${stageName}`] = argoApplication;
      return map;
    }, {});

    return stages.map((stage) => ({
      stage,
      applications: applications.map((application) => {
        const argoApplication =
          argoApplicationsMap[`${application?.metadata.name}${stage.spec.name}`];
        return { application, argoApplication };
      }),
    }));
  }, [applications, argoApplications, stages]);

  const DataContextValue = React.useMemo(
    () => ({
      CDPipeline: {
        data: CDPipeline?.jsonData,
        error: CDPipelineGetError,
        isLoading: CDPipeline === null,
      },
      stages: {
        data: sortedStages,
        error: stagesError,
        isLoading: sortedStages === null,
      },
      stagesWithApplicationsData: {
        data: stagesWithApplicationsData,
        error: applicationsError || argoApplicationsError,
        isLoading: stagesWithApplicationsData === null,
      },
    }),
    [
      CDPipeline,
      CDPipelineGetError,
      applicationsError,
      argoApplicationsError,
      sortedStages,
      stagesError,
      stagesWithApplicationsData,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
