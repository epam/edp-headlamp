import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Section } from '../../../../components/Section';
import { PipelineKubeObject } from '../../../../k8s/groups/Tekton/Pipeline';
import { TriggerTemplateKubeObject } from '../../../../k8s/groups/Tekton/TriggerTemplate';
import { Tabs } from '../../../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../../../providers/Tabs/hooks';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PipelineActionsMenu } from '../../../../widgets/PipelineActionsMenu';
import { routePipelineList } from '../pipeline-list/route';
import { useTabs } from './hooks/useTabs';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { PipelineDetailsRouteParams } from './types';

export const PageView = () => {
  const { namespace, name } = useParams<PipelineDetailsRouteParams>();
  const [pipeline, pipelineError] = PipelineKubeObject.useGet(name, namespace);
  const [triggerTemplates, triggerTemplatesError] = TriggerTemplateKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const tabs = useTabs({ pipeline });

  const { activeTab, handleChangeTab } = useTabsContext();

  const renderPageContent = React.useCallback(() => {
    if (pipelineError) {
      return <ErrorContent error={pipelineError} />;
    }

    return (
      <LoadingWrapper isLoading={pipeline === null}>
        <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />
      </LoadingWrapper>
    );
  }, [activeTab, handleChangeTab, pipeline, pipelineError, tabs]);

  const permissions = useTypedPermissions();

  const resourcesAreLoaded =
    pipeline !== null && triggerTemplates !== null && !pipelineError && !triggerTemplatesError;

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
        resourcesAreLoaded && (
          <PipelineActionsMenu
            data={{
              pipeline: pipeline?.jsonData ?? pipeline,
              triggerTemplates,
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
