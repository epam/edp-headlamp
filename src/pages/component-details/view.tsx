import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContent } from '../../components/ErrorContent';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { PageWrapper } from '../../components/PageWrapper';
import { QuickLink } from '../../components/QuickLink';
import { Section } from '../../components/Section';
import { CODEBASE_TYPE, CodebaseType } from '../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { Resources } from '../../icons/sprites/Resources';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../k8s/groups/EDP/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList/provider';
import { Tabs } from '../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../providers/Tabs/hooks';
import { LinkCreationService } from '../../services/link-creation';
import { CodebaseActionsMenu } from '../../widgets/CodebaseActionsMenu';
import { routeComponentList } from '../component-list/route';
import { routeSonar } from '../configuration/pages/sonar/route';
import { usePageTabs } from './hooks/usePageTabs';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { ComponentDetailsRouteParams } from './types';

const docLinkByCodebaseType = (codebaseType: CodebaseType | undefined) => {
  switch (codebaseType) {
    case CODEBASE_TYPE.APPLICATION:
      return EDP_USER_GUIDE.APPLICATION_MANAGE.url;
    case CODEBASE_TYPE.AUTOTEST:
      return EDP_USER_GUIDE.AUTOTEST_MANAGE.url;
    case CODEBASE_TYPE.LIBRARY:
      return EDP_USER_GUIDE.LIBRARY_MANAGE.url;
    case CODEBASE_TYPE.INFRASTRUCTURE:
      return EDP_USER_GUIDE.INFRASTRUCTURE_MANAGE.url;

    default:
      return EDP_USER_GUIDE.APPLICATION_MANAGE.url;
  }
};

export const PageView = () => {
  const { name } = useParams<ComponentDetailsRouteParams>();
  const { component } = useDynamicDataContext();
  const permissions = useTypedPermissions();

  const componentType = component.data?.spec?.type;
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery();

  const tabs = usePageTabs();

  const { activeTab, handleChangeTab } = useTabsContext();

  const resourceIsLoaded = !component.isLoading && !component.error;

  const renderPageContent = React.useCallback(() => {
    if (component.error) {
      return <ErrorContent error={component.error} />;
    }

    return (
      <LoadingWrapper isLoading={component.isLoading}>
        <Resources />
        <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />
      </LoadingWrapper>
    );
  }, [activeTab, component.error, component.isLoading, handleChangeTab, tabs]);

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Components',
          url: {
            pathname: routeComponentList.path,
          },
        },
        {
          label: name,
        },
      ]}
      headerSlot={
        <>
          {resourceIsLoaded && (
            <div style={{ marginLeft: 'auto' }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <QuickLink
                  name={{
                    label: 'git',
                    value: 'git',
                  }}
                  enabledText="Open in GIT"
                  icon={ICONS.SONAR}
                  externalLink={component.data?.status?.gitWebUrl}
                  isTextButton
                />
                <QuickLink
                  name={{
                    label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.SONAR],
                    value: SYSTEM_QUICK_LINKS.SONAR,
                  }}
                  enabledText="Open the Quality Gates"
                  icon={ICONS.SONAR}
                  externalLink={LinkCreationService.sonar.createDashboardLink({
                    baseURL: QuickLinksURLS?.[SYSTEM_QUICK_LINKS.SONAR],
                    codebaseName: name,
                  })}
                  configurationLink={{
                    routeName: routeSonar.path,
                  }}
                  isTextButton
                />
                {componentType !== CODEBASE_TYPE.SYSTEM && (
                  <ResourceActionListContextProvider>
                    <CodebaseActionsMenu
                      data={{
                        codebaseData: component.data!,
                      }}
                      permissions={permissions}
                      backRoute={Router.createRouteURL(routeComponentList.path)}
                      variant="inline"
                    />
                  </ResourceActionListContextProvider>
                )}
              </Stack>
            </div>
          )}
        </>
      }
    >
      <Section
        title={name}
        enableCopyTitle
        description={
          <>
            Review {component.data?.spec.type || 'codebase'}, monitor its status, and execute build
            pipelines.{' '}
            <LearnMoreLink url={docLinkByCodebaseType(component.data?.spec.type as CodebaseType)} />
          </>
        }
      >
        {renderPageContent()}
      </Section>
    </PageWrapper>
  );
};
