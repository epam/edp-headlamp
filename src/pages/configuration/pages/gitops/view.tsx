import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyList } from '../../../../components/EmptyList';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../components/StatusIcon';
import { CODEBASE_TYPE } from '../../../../constants/codebaseTypes';
import { CUSTOM_RESOURCE_STATUS } from '../../../../constants/statuses';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import {
  CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE,
  CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE,
} from '../../../../k8s/groups/EDP/Codebase/labels';
import { GitServerKubeObject } from '../../../../k8s/groups/EDP/GitServer';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { rem } from '../../../../utils/styling/rem';
import { ManageGitOps } from '../../../../widgets/ManageGitOps';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { routeGitServerList } from '../gitservers/route';
import { pageDescription } from './constants';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const [codebases, codebasesError] = CodebaseKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE}=${CODEBASE_TYPE.SYSTEM}`,
  });

  const gitOpsCodebase =
    codebases?.find(
      (el) => el.metadata.labels[CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE] === 'gitops'
    ) ?? null;

  const status = gitOpsCodebase?.status?.status;
  const [icon, color, isRotating] = CodebaseKubeObject.getStatusIcon(status);

  const [gitServers, gitServersError] = GitServerKubeObject.useList({
    namespace: getDefaultNamespace(),
  });
  const history = useHistory();

  const gitServersConfigurationPageRoute = Router.createRouteURL(routeGitServerList.path);

  const error = codebasesError || gitServersError;
  const isLoading = (codebases === null || gitServers === null) && !error;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const permissions = useTypedPermissions();

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = getForbiddenError(error);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!isLoading && !gitServers?.length && !permissions.create.Codebase.allowed) {
      return <EmptyList customText={permissions.create.Codebase.reason} />;
    }

    if (!isLoading && !gitServers?.length) {
      return (
        <EmptyList
          customText={'No Git Servers Connected.'}
          linkText={'Click here to add a Git Server.'}
          handleClick={() => history.push(gitServersConfigurationPageRoute)}
        />
      );
    }

    if (!isLoading && !gitOpsCodebase && !error) {
      return (
        <>
          <EmptyList
            customText={'No GitOps repositories found.'}
            linkText={'Click here to add GitOps repository.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    return (
      <LoadingWrapper isLoading={isLoading}>
        <Accordion expanded>
          <AccordionSummary>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item style={{ marginRight: rem(5) }}>
                <StatusIcon
                  icon={icon}
                  color={color}
                  isRotating={isRotating}
                  Title={
                    <>
                      <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                        {`Status: ${status || 'Unknown'}`}
                      </Typography>
                      {status === CUSTOM_RESOURCE_STATUS.FAILED && (
                        <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                          {gitOpsCodebase?.status?.detailedMessage}
                        </Typography>
                      )}
                    </>
                  }
                />
              </Grid>
              <Grid item>GitOps</Grid>
              <Grid item sx={{ ml: 'auto' }}>
                <Button
                  component={Link}
                  href={gitOpsCodebase?.status?.gitWebUrl}
                  target="_blank"
                  startIcon={<Icon icon={ICONS.GIT_BRANCH} width="15" height="15" />}
                >
                  Go to the Source Code
                </Button>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ManageGitOps
              formData={{
                currentElement: gitOpsCodebase,
                isReadOnly: true,
                permissions,
              }}
            />
          </AccordionDetails>
        </Accordion>
      </LoadingWrapper>
    );
  }, [
    color,
    error,
    gitOpsCodebase,
    gitServers?.length,
    gitServersConfigurationPageRoute,
    history,
    icon,
    isLoading,
    isRotating,
    permissions,
    status,
  ]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add GitOps repository',
        component: (
          <ManageGitOps
            formData={{
              currentElement: 'placeholder',
              handleClosePlaceholder: handleCloseCreateDialog,
              permissions,
            }}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading || !!gitOpsCodebase,
        permission: {
          allowed: permissions.create.Codebase.allowed,
          reason: permissions.create.Codebase.reason,
        },
      }}
      pageDescription={pageDescription}
    >
      {renderPageContent()}
    </ConfigurationPageContent>
  );
};
