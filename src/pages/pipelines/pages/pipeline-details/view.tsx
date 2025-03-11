import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Section } from '../../../../components/Section';
import { PipelineKubeObject } from '../../../../k8s/groups/Tekton/Pipeline';
import { Tabs } from '../../../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../../../providers/Tabs/hooks';
import { PipelineActionsMenu } from '../../../../widgets/PipelineActionsMenu';
import { routePipelineList } from '../pipeline-list/route';
import { useTabs } from './hooks/useTabs';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { PipelineDetailsRouteParams } from './types';

export const PageView = () => {
  const { namespace, name } = useParams<PipelineDetailsRouteParams>();
  const [item, error] = PipelineKubeObject.useGet(name, namespace);

  const tabs = useTabs({ pipeline: item });

  const { activeTab, handleChangeTab } = useTabsContext();

  const renderPageContent = React.useCallback(() => {
    if (error) {
      return <ErrorContent error={error} />;
    }

    return (
      <LoadingWrapper isLoading={item === null}>
        <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />
      </LoadingWrapper>
    );
  }, [activeTab, error, handleChangeTab, item, tabs]);

  const permissions = useTypedPermissions();

  const resourceIsLoaded = item !== null && !error;

  return (
    <PageWrapper
      containerMaxWidth={'xl'}
      breadcrumbs={[
        {
          label: 'Pipelines',
          url: {
            pathname: routePipelineList.path,
          },
        },
        {
          label: name,
        },
      ]}
      headerSlot={
        resourceIsLoaded && (
          <PipelineActionsMenu
            data={{
              pipeline: item?.jsonData ?? item,
            }}
            permissions={permissions}
            variant="inline"
          />
        )
      }
    >
      <Section title={name} enableCopyTitle>
        {renderPageContent()}
      </Section>
    </PageWrapper>
  );
};
