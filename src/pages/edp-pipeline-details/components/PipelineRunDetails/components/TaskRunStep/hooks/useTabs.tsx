import React from 'react';
import { ViewYAML } from '../../../../../../../components/Editor';
import { PodKubeObject } from '../../../../../../../k8s/Pod';
import { LogsViewer } from '../../../../../../../widgets/LogViewer';
import { TabContent } from '../../TabContent';

export const useTabs = ({ taskRun, stepName }) => {
  const details = taskRun?.status?.taskSpec?.steps.find((el) => el.name === stepName);

  const [pods] = PodKubeObject.useList({
    labelSelector: `tekton.dev/taskRun=${taskRun.metadata.name}`,
    namespace: taskRun.metadata.namespace,
  });

  const getDefaultContainer = React.useCallback(
    (pod) => {
      return pod?.spec?.containers.find((container) => container.name.includes(stepName))?.name;
    },
    [stepName]
  );

  console.log(getDefaultContainer, stepName, pods);

  return React.useMemo(() => {
    return [
      {
        label: 'Details',
        component: (
          <TabContent>
            <ViewYAML item={details} />
          </TabContent>
        ),
      },
      {
        label: 'Logs',
        component: (
          <TabContent>
            <LogsViewer pods={pods} getDefaultContainer={getDefaultContainer} />
          </TabContent>
        ),
        disabled: !pods?.length,
      },
    ];
  }, [details, getDefaultContainer, pods]);
};
