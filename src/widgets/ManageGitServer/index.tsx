import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm/provider';
import { Actions } from './components/Actions';
import { CredentialsForm } from './components/Credentials';
import { GitServerForm } from './components/GitServer';
import { useCredentialsCreateForm } from './hooks/useCredentialsCreateForm';
import { useCredentialsEditForm } from './hooks/useCredentialsEditForm';
import { useGitServerCreateForm } from './hooks/useGitServerCreateForm';
import { useGitServerEditForm } from './hooks/useGitServerEditForm';
import { useSharedForm } from './hooks/useSharedForm';
import { GIT_SERVER_FORM_NAMES } from './names';
import { DataContextProvider } from './providers/Data';
import { FormNames, ManageGitServerProps } from './types';
import { getGitServerSecret } from './utils';

export const ManageGitServer = ({
  gitServer,
  webhookURL,
  repositorySecrets,
  permissions,
  handleClosePanel,
}: ManageGitServerProps) => {
  const { form: sharedForm } = useSharedForm({ gitServer });
  const gitProviderSharedValue = sharedForm.watch(GIT_SERVER_FORM_NAMES.gitProvider.name);

  const gitServerSecret = React.useMemo(
    () => getGitServerSecret(gitServer, repositorySecrets, gitProviderSharedValue),
    [gitProviderSharedValue, gitServer, repositorySecrets]
  );

  const gitServerCreateForm = useGitServerCreateForm({
    handleClosePanel,
    permissions,
  });

  const gitServerEditForm = useGitServerEditForm({ gitServer, webhookURL, permissions });

  const credentialsCreateForm = useCredentialsCreateForm({
    sharedForm,
    permissions,
  });

  const credentialsEditForm = useCredentialsEditForm({
    sharedForm,
    gitServerSecret,
    permissions,
  });

  const gitServerForm = gitServer ? gitServerEditForm : gitServerCreateForm;
  const credentialsForm = gitServerSecret ? credentialsEditForm : credentialsCreateForm;

  return (
    <div data-testid="form">
      <DataContextProvider
        gitServer={gitServer}
        gitServerSecret={gitServerSecret}
        permissions={permissions}
        handleClosePanel={handleClosePanel}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            gitServer: gitServerForm,
            credentials: credentialsForm,
          }}
          sharedForm={sharedForm}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <GitServerForm />
            </Grid>
            <Grid item xs={12}>
              <CredentialsForm gitServerSecret={gitServerSecret} />
            </Grid>
            <Grid item xs={12}>
              <Actions />
            </Grid>
          </Grid>
        </MultiFormContextProvider>
      </DataContextProvider>
    </div>
  );
};
