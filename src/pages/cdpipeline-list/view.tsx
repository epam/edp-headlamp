import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Stack } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonWithPermission } from '../../components/ButtonWithPermission';
import { EmptyList } from '../../components/EmptyList';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useGitOpsCodebaseQuery } from '../../k8s/groups/EDP/Codebase/hooks/useGitOpsCodebaseQuery';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList/provider';
import { ManageCDPipelineDialog } from '../../widgets/dialogs/ManageCDPipeline';
import { routeGitOps } from '../configuration/pages/gitops/route';
import { CDPipelineList } from './components/CDPipelineList';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const gitOpsCodebaseQuery = useGitOpsCodebaseQuery();

  const { setDialog } = useDialogContext();

  const history = useHistory();

  const gitOpsConfigurationPageRoute = Router.createRouteURL(routeGitOps.path);

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
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="flex-end">
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
          </Stack>
          <ResourceActionListContextProvider>
            <CDPipelineList
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
        </Stack>
      </Section>
    </PageWrapper>
  );
};
