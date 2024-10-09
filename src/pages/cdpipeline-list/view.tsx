import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Grid } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonWithPermission } from '../../components/ButtonWithPermission';
import { EmptyList } from '../../components/EmptyList';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useCodebasesByTypeLabelQuery } from '../../k8s/groups/EDP/Codebase/hooks/useCodebasesByTypeLabelQuery';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE } from '../../k8s/groups/EDP/Codebase/labels';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { Filter } from '../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../providers/Filter/hooks';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList/provider';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { ManageCDPipelineDialog } from '../../widgets/dialogs/ManageCDPipeline';
import { routeGitOps } from '../configuration/pages/gitops/route';
import { CDPipelineList } from './components/CDPipelineList';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const gitOpsCodebaseQuery = useCodebasesByTypeLabelQuery({
    props: {
      namespace: getDefaultNamespace(),
      codebaseType: CODEBASE_TYPES.SYSTEM,
    },
    options: {
      select: (data) => {
        return data?.items.find(
          (el) => el.metadata.labels[CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE] === 'gitops'
        );
      },
    },
  });

  const { setDialog } = useDialogContext();

  const history = useHistory();

  const gitOpsConfigurationPageRoute = Router.createRouteURL(routeGitOps.path);

  const { filterFunction } = useFilterContext();

  const permissions = useTypedPermissions();

  return (
    <PageWrapper>
      <Section
        title="Deployment Flows"
        description={
          <>
            Orchestrate and Monitor Your Deployment Flows.{' '}
            <LearnMoreLink url={EDP_USER_GUIDE.CD_PIPELINE_CREATE.anchors.CREATE_VIA_UI.url} />
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
              <Grid item flexGrow={1}>
                <Filter
                  controls={{
                    namespace: {
                      component: <NamespaceControl />,
                    },
                    search: {
                      component: <SearchControl />,
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <ButtonWithPermission
                  ButtonProps={{
                    variant: 'contained',
                    color: 'primary',
                    startIcon: <Icon icon={ICONS.PLUS} />,
                    onClick: () =>
                      setDialog(ManageCDPipelineDialog, {
                        CDPipelineData: null,
                      }),
                    disabled: !gitOpsCodebaseQuery.data,
                  }}
                  disabled={!permissions.create.CDPipeline.allowed}
                  reason={permissions.create.CDPipeline.reason}
                >
                  create deployment flow
                </ButtonWithPermission>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ResourceActionListContextProvider>
              <CDPipelineList
                filterFunction={filterFunction}
                blockerComponent={
                  gitOpsCodebaseQuery.isFetched &&
                  !gitOpsCodebaseQuery.data && (
                    <EmptyList
                      customText={'No GitOps repository configured.'}
                      linkText={'Click here to add a repository.'}
                      handleClick={() => history.push(gitOpsConfigurationPageRoute)}
                    />
                  )
                }
              />
            </ResourceActionListContextProvider>
          </Grid>
        </Grid>
      </Section>
    </PageWrapper>
  );
};
