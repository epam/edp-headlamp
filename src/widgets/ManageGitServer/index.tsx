import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm/provider';
import { FormItem } from '../../providers/MultiForm/types';
import { FORM_MODES } from '../../types/forms';
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
  handleClosePanel,
}: ManageGitServerProps) => {
  const gitServerFormMode = gitServer ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const { form: sharedForm } = useSharedForm({ gitServer });
  const gitProviderSharedValue = sharedForm.watch(GIT_SERVER_FORM_NAMES.gitProvider.name);

  const gitServerSecret = React.useMemo(
    () => getGitServerSecret(gitServer, repositorySecrets, gitProviderSharedValue),
    [gitProviderSharedValue, gitServer, repositorySecrets]
  );

  const credentialsFormMode = gitServerSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const gitServerCreateForm = useGitServerCreateForm({
    handleClosePanel,
  });

  const gitServerEditForm = useGitServerEditForm({ gitServer, webhookURL });

  const credentialsCreateForm = useCredentialsCreateForm({
    sharedForm,
  });

  const credentialsEditForm = useCredentialsEditForm({
    sharedForm,
    gitServerSecret,
  });

  const gitServerFormData: FormItem = React.useMemo(
    () =>
      gitServerFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: gitServerCreateForm.form,
            onSubmit: gitServerCreateForm.form.handleSubmit(gitServerCreateForm.handleSubmit),
            isSubmitting: gitServerCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: gitServerEditForm.form,
            onSubmit: gitServerEditForm.form.handleSubmit(gitServerEditForm.handleSubmit),
            isSubmitting: gitServerEditForm.mutation.isLoading,
          },
    [gitServerCreateForm, gitServerEditForm, gitServerFormMode]
  );

  const credentialsFormData: FormItem = React.useMemo(
    () =>
      credentialsFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: credentialsCreateForm.form,
            onSubmit: credentialsCreateForm.form.handleSubmit(credentialsCreateForm.handleSubmit),
            isSubmitting: credentialsCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: credentialsEditForm.form,
            onSubmit: credentialsEditForm.form.handleSubmit(credentialsEditForm.handleSubmit),
            isSubmitting: credentialsEditForm.mutation.isLoading,
          },
    [credentialsCreateForm, credentialsEditForm, credentialsFormMode]
  );

  return (
    <div data-testid="form">
      <DataContextProvider gitServer={gitServer} gitServerSecret={gitServerSecret}>
        <MultiFormContextProvider<FormNames>
          forms={{
            gitServer: gitServerFormData,
            credentials: credentialsFormData,
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
