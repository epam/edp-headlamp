import React from 'react';
import { ViewYAML } from '../../../../../../../../../components/Editor';
import { PodKubeObjectInterface } from '../../../../../../../../../k8s/groups/default/Pod/types';
import { TaskKubeObjectInterface } from '../../../../../../../../../k8s/groups/Tekton/Task/types';
import { TaskRunKubeObjectInterface } from '../../../../../../../../../k8s/groups/Tekton/TaskRun/types';
import { PodsLogViewer } from '../../../../../../../../../widgets/PodsLogViewer';
import { TabContent } from '../../TabContent';

export const useTabs = ({
  taskRun,
  task,
  stepName,
  pods,
}: {
  taskRun: TaskRunKubeObjectInterface | undefined;
  task: TaskKubeObjectInterface | undefined;
  stepName: string;
  pods: PodKubeObjectInterface[];
}) => {
  const details = taskRun
    ? taskRun?.status?.taskSpec?.steps.find((el: { name: string }) => el.name === stepName)
    : task?.spec?.steps.find((el: { name: string }) => el.name === stepName);

  const getDefaultContainer = React.useCallback(
    (pod) => {
      return pod?.spec?.containers.find((container: { name: string }) =>
        container.name.includes(stepName)
      )?.name;
    },
    [stepName]
  );

  const defaultContainer = getDefaultContainer(pods?.[0]);

  return React.useMemo(() => {
    return [
      {
        label: 'Logs',
        component: (
          <TabContent>
            <PodsLogViewer
              key={defaultContainer}
              pods={pods}
              getDefaultContainer={getDefaultContainer}
            />
          </TabContent>
        ),
        disabled: !pods?.length,
      },
      {
        label: 'Details',
        component: (
          <TabContent>
            <ViewYAML item={details} />
          </TabContent>
        ),
      },
    ];
  }, [defaultContainer, details, getDefaultContainer, pods]);
};
