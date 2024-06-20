import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { QuickLink } from '../../components/QuickLink';
import { Section } from '../../components/Section';
import { Tabs } from '../../components/Tabs';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { Resources } from '../../icons/sprites/Resources';
import { SYSTEM_QUICK_LINKS, SYSTEM_QUICK_LINKS_LABELS } from '../../k8s/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { LinkCreationService } from '../../services/link-creation';
import { CodebaseActionsMenu } from '../../widgets/CodebaseActionsMenu';
import { routeEDPComponentList } from '../edp-component-list/route';
import { routeEDPSonarIntegration } from '../edp-configuration/pages/edp-sonar-integration/route';
import { usePageTabs } from './hooks/usePageTabs';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { usePermissionsContext } from './providers/Permissions/hooks';
import { ComponentDetailsRouteParams } from './types';

export const PageView = () => {
  const { name } = useParams<ComponentDetailsRouteParams>();
  const { component } = useDynamicDataContext();
  const { codebase: codebasePermissions } = usePermissionsContext();

  const componentType = component.data?.spec?.type;
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery();

  const tabs = usePageTabs();

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Components',
          url: {
            pathname: routeEDPComponentList.path,
          },
        },
        {
          label: name,
        },
      ]}
      headerSlot={
        <>
          {!!component.data && (
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
                    defaultBranchName: component.data?.spec.defaultBranch,
                  })}
                  configurationLink={{
                    routeName: routeEDPSonarIntegration.path,
                  }}
                  isTextButton
                />
                {componentType !== CODEBASE_TYPES.SYSTEM && (
                  <ResourceActionListContextProvider>
                    <CodebaseActionsMenu
                      data={{
                        codebaseData: component.data,
                      }}
                      permissions={codebasePermissions}
                      backRoute={Router.createRouteURL(routeEDPComponentList.path)}
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
        description={'Review your codebases, monitor their status, and execute build pipelines.'}
      >
        <Resources />
        <Tabs tabs={tabs} initialTabIdx={0} rememberLastTab id="component-page" />
      </Section>
    </PageWrapper>
  );
};
