import { NameValueTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { ViewYAML } from '../../../../../../../../../../../components/Editor';
import { TaskKubeObjectInterface } from '../../../../../../../../../../../k8s/groups/Tekton/Task/types';
import { TaskRunKubeObjectInterface } from '../../../../../../../../../../../k8s/groups/Tekton/TaskRun/types';
import { TabContent } from '../../../../TabContent';

export const useTabs = ({
  taskRun,
  task,
}: {
  taskRun: TaskRunKubeObjectInterface;
  task: TaskKubeObjectInterface;
}) => {
  const results = taskRun?.status?.results;
  const taskRunIsLoaded = !!taskRun;
  const hasParams = taskRun?.spec?.params && taskRun?.spec?.params.length > 0;
  const hasResults = results && results.length > 0;

  return React.useMemo(() => {
    return [
      ...(hasParams
        ? [
            {
              label: 'Parameters',
              component: (
                <TabContent>
                  <NameValueTable
                    rows={taskRun?.spec?.params.map((el: { name: string; value: string }) => ({
                      name: el.name,
                      value: el.value,
                    }))}
                  />
                </TabContent>
              ),
            },
          ]
        : []),
      ...(hasResults
        ? [
            {
              label: 'Results',
              component: (
                <TabContent>
                  <NameValueTable
                    rows={results?.map((el: { name: string; value: string }) => ({
                      name: el.name,
                      value: el.value,
                    }))}
                  />
                </TabContent>
              ),
            },
          ]
        : []),
      {
        label: 'Status',
        component: (
          <ViewYAML
            item={
              taskRunIsLoaded
                ? taskRun?.status
                : { steps: task?.spec?.steps.map((el: { name: string; value: string }) => el.name) }
            }
          />
        ),
      },
    ];
  }, [
    hasParams,
    hasResults,
    results,
    task,
    taskRun?.spec?.params,
    taskRun?.status,
    taskRunIsLoaded,
  ]);
};
