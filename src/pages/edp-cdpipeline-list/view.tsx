import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { Grid } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonWithPermission } from '../../components/ButtonWithPermission';
import { EmptyList } from '../../components/EmptyList';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { useCodebasesByTypeLabelQuery } from '../../k8s/EDPCodebase/hooks/useCodebasesByTypeLabelQuery';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE } from '../../k8s/EDPCodebase/labels';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { Filter } from '../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../providers/Filter/hooks';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { FORM_MODES } from '../../types/forms';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../widgets/CreateEditCDPipeline/constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../../widgets/CreateEditCDPipeline/types';
import { routeEDPGitOpsConfiguration } from '../edp-configuration/pages/edp-gitops/route';
import { CDPipelineList } from './components/CDPipelineList';
import { usePermissionsContext } from './providers/Permissions/hooks';

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

  const [CDPipelines, CDPipelinesError] = EDPCDPipelineKubeObject.useList();

  const error = CDPipelinesError || (gitOpsCodebaseQuery.error as ApiError);
  const isLoading = (CDPipelines === null || gitOpsCodebaseQuery.isLoading) && !error;

  const { setDialog } = useDialogContext();

  const createEditCDPipelineDialogForwardedProps: CreateEditCDPipelineDialogForwardedProps =
    React.useMemo(() => ({ mode: FORM_MODES.CREATE }), []);

  const history = useHistory();

  const gitOpsConfigurationPageRoute = Router.createRouteURL(routeEDPGitOpsConfiguration.path);

  const { filterFunction } = useFilterContext();

  const { cdPipeline: CDPipelinePermissions, codebase: codebasePermissions } =
    usePermissionsContext();

  return (
    <PageWrapper>
      <Section
        title="Environments"
        description={
          <>
            Manage your environments with deployed applications.{' '}
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
                      setDialog({
                        modalName: CREATE_EDIT_CD_PIPELINE_DIALOG_NAME,
                        forwardedProps: createEditCDPipelineDialogForwardedProps,
                      }),
                    disabled: !gitOpsCodebaseQuery.data,
                  }}
                  allowed={CDPipelinePermissions.create}
                  text="You do not have permission to create a CD Pipeline."
                >
                  create environment
                </ButtonWithPermission>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ResourceActionListContextProvider>
              <LoadingWrapper isLoading={isLoading}>
                <CDPipelineList
                  CDPipelines={CDPipelines}
                  error={error}
                  filterFunction={filterFunction}
                  blockerComponent={
                    codebasePermissions.create ? (
                      !gitOpsCodebaseQuery.data && (
                        <EmptyList
                          customText={'No GitOps repository configured.'}
                          linkText={'Click here to add a repository.'}
                          handleClick={() => history.push(gitOpsConfigurationPageRoute)}
                        />
                      )
                    ) : (
                      <EmptyList customText="You do not have permission to create GitOps repository." />
                    )
                  }
                />
              </LoadingWrapper>
            </ResourceActionListContextProvider>
          </Grid>
        </Grid>
      </Section>
    </PageWrapper>
  );
};
