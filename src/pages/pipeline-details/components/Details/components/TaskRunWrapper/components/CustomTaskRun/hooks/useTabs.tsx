import { NameValueTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { ViewYAML } from '../../../../../../../../../components/Editor';
import { TabContent } from '../../../../TabContent';

export const useTabs = ({ taskRun }) => {
  const results = taskRun?.status?.results;
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
                    rows={taskRun?.spec?.params.map((el) => ({
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
                    rows={results?.map((el) => ({
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
        component: <ViewYAML item={taskRun?.status} />,
      },
    ];
  }, [hasParams, hasResults, results, taskRun?.spec?.params, taskRun?.status]);
};
